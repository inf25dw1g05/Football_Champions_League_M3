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
    EditButton,
    SelectInput
} from 'react-admin';
import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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

export const TeamList = (props) => {
    const theme = useTheme();

    return (
        <List {...props}>
            <Datagrid 
                rowClick="show"
                sx={{
                    '& .RaDatagrid-headerCell': {
                        fontWeight: 'bold',
                        backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#1976d2',
                        color: 'white'
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
};

export const TeamShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Nome" />
            <TextField source="country" label="País" />
            <TextField source="coach" label="Treinador" />
            <GroupField label="Grupo" />
            
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
            <SelectInput source="group_name" label="Grupo" choices={[
                { id: 'A', name: 'Grupo A' },
                { id: 'B', name: 'Grupo B' },
                { id: 'C', name: 'Grupo C' },
                { id: 'D', name: 'Grupo D' },
                { id: 'E', name: 'Grupo E' },
                { id: 'F', name: 'Grupo F' },
                { id: 'G', name: 'Grupo G' },
                { id: 'H', name: 'Grupo H' },
            ]} />
        </SimpleForm>
    </Edit>
);