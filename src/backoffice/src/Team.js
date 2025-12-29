import { List, Edit, SimpleForm, TextInput, Datagrid, TextField,useRecordContext} from 'react-admin';

const PostTitle = () => {
const record = useRecordContext();
return record ? (<span>Team:  {`${record.name}`}</span>):null;
}

export const TeamList = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="country" />
            <TextField source="coach" />
            <TextField source="group_name" />
        </Datagrid>
    </List>
);

export const TeamEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="name" label="Nome"/>
            <TextInput source="country" label="País"/>
            <TextInput source="coach" label="Treinador"/>
            <TextInput source="group_name" label="Grupo"/>
        </SimpleForm>
    </Edit>
);

