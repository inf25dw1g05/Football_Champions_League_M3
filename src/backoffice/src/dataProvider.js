import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:3000';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    return fetchUtils.fetchJson(url, options);
};

export default {
    // GET LIST - /teams
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        
        // Loopback filter format
        const filter = {
            limit: perPage,
            skip: (page - 1) * perPage,
            order: `${field} ${order}`,
        };

        // Add search filters
        if (params.filter && Object.keys(params.filter).length > 0) {
            filter.where = {};
            Object.keys(params.filter).forEach(key => {
                if (params.filter[key] !== '' && params.filter[key] !== null) {
                    // Text search with LIKE
                    if (typeof params.filter[key] === 'string') {
                        filter.where[key] = { like: `%${params.filter[key]}%`, options: 'i' };
                    } else {
                        filter.where[key] = params.filter[key];
                    }
                }
            });
        }

        const query = { filter: JSON.stringify(filter) };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ json }) => {
            // Se retornar menos que perPage, é a última página
            const total = json.length < perPage ? 
                (page - 1) * perPage + json.length : 
                page * perPage + 1; // Estima que há mais páginas
            
            return {
                data: json,
                total: total,
            };
        });
    },

    // GET ONE - /teams/1
    getOne: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url).then(({ json }) => ({
            data: json,
        }));
    },

    // GET MANY - /teams?filter={"where":{"id":{"inq":[1,2,3]}}}
    getMany: (resource, params) => {
        const filter = {
            where: { id: { inq: params.ids } }
        };
        const query = { filter: JSON.stringify(filter) };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    // GET MANY REFERENCE - Para relações
    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        
        const filter = {
            limit: perPage,
            skip: (page - 1) * perPage,
            order: `${field} ${order}`,
            where: { [params.target]: params.id }
        };

        const query = { filter: JSON.stringify(filter) };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        
        return httpClient(url).then(({ json }) => ({
            data: json,
            total: json.length,
        }));
    },

    // CREATE - POST /teams
    create: (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        return httpClient(url, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },

    // UPDATE - PATCH /teams/1
    update: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    // UPDATE MANY
    updateMany: (resource, params) => {
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(params.data),
                })
            )
        ).then(responses => ({ data: params.ids }));
    },

    // DELETE - DELETE /teams/1
    delete: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.id}`;
        return httpClient(url, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    },

    // DELETE MANY
    deleteMany: (resource, params) => {
        return Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                })
            )
        ).then(responses => ({ data: params.ids }));
    },
};