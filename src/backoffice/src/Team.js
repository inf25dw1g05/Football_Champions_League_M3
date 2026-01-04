import { 
    List, 
    Edit, 
    Show,
    SimpleForm, 
    SimpleShowLayout,
    TextInput, 
    Datagrid, 
    TextField,
    useRecordContext,
    ReferenceManyField,
    NumberField,
    ShowButton,
    EditButton
} from 'react-admin';
import { Chip } from '@mui/material';

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Team: {`${record.name}`}</span>) : null;
}

const GroupField = () => {
    const record = useRecordContext();
    if (!record || !record.group_name) return null;
    return (
        <Chip 
            label={`Grupo ${record.group_name}`} 
            color="primary" 
            size="small" 
        />
    );
};

export const TeamList = (props) => (
    <List {...props}>
        <Datagrid 
            rowClick="show"
            sx={{
                '& .RaDatagrid-headerCell': {
                    fontWeight: 'bold',
                    backgroundColor: 'gray'
                }
            }}
        >
            <TextField source="id" />
            <TextField source="name" label="Nome" />
            <TextField source="country" label="País" />
            <TextField source="coach" label="Treinador" />
            <GroupField label="Grupo" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const TeamShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Nome" />
            <TextField source="country" label="País" />
            <TextField source="coach" label="Treinador" />
            <GroupField label="Grupo" />
            
            {/* Lista de jogadores desta equipa */}
            <ReferenceManyField 
                label="Jogadores da Equipa" 
                reference="players" 
                target="team_id"
                sort={{ field: 'shirt_number', order: 'ASC' }}
            >
                <Datagrid>
                    <NumberField source="shirt_number" label="Nº" />
                    <TextField source="name" label="Nome" />
                    <TextField source="position" label="Posição" />
                    <TextField source="nationality" label="Nacionalidade" />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);

export const TeamEdit = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" label="Nome" />
            <TextInput source="country" label="País" />
            <TextInput source="coach" label="Treinador" />
            <TextInput source="group_name" label="Grupo" />
        </SimpleForm>
    </Edit>
);