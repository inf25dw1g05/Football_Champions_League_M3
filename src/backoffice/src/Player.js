import { List, Edit, Create, SimpleForm, TextInput, NumberInput, Datagrid, TextField, NumberField, ReferenceField, ReferenceInput, SelectInput, Filter, useRecordContext, required, minValue, maxValue } from 'react-admin';

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Player: {`${record.name}`}</span>) : null;
}

const PlayerFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Pesquisar por Nome" source="name" alwaysOn />
        <TextInput label="Posição" source="position" />
        <TextInput label="Nacionalidade" source="nationality" />
        <ReferenceInput label="Equipa" source="team_id" reference="teams">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

export const PlayerList = (props) => (
    <List filters={<PlayerFilter />} {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" label="Nome" />
            <TextField source="position" label="Posição" />
            <TextField source="nationality" label="Nacionalidade" />
            <NumberField source="shirt_number" label="Nº Camisola" />
            <ReferenceField source="team_id" reference="teams" label="Equipa">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export const PlayerEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Nome" validate={required()} />
            <TextInput source="position" label="Posição" />
            <TextInput source="nationality" label="Nacionalidade" />
            <NumberInput source="shirt_number" label="Nº Camisola" validate={[required(), minValue(1), maxValue(99)]} />
            <ReferenceInput source="team_id" reference="teams">
                <SelectInput optionText="name" label="Equipa" validate={required()}/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const PlayerCreate = (props) => (
    <Create title="Novo Jogador" {...props}>
        <SimpleForm>
            <TextInput source="name" label="Nome" validate={required()} />
            <TextInput source="position" label="Posição" />
            <TextInput source="nationality" label="Nacionalidade" />
            <NumberInput source="shirt_number" label="Nº Camisola" validate={[required(), minValue(1), maxValue(99)]} />
            <ReferenceInput source="team_id" reference="teams">
                <SelectInput optionText="name" label="Equipa" validate={required()}/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);