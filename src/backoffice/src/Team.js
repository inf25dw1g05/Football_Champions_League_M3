import { DataTable, List,  Edit, SimpleForm, TextInput } from 'react-admin';

export const TeamList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="country" />
            <DataTable.Col source="coach" />
            <DataTable.Col source="group_name" />
        </DataTable>
    </List>
);

export const TeamEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="name" />
            <TextInput source="country" />
            <TextInput source="coach" />
            <TextInput source="group_name" />
        </SimpleForm>
    </Edit>
);

