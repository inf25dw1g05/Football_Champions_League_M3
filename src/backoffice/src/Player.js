import { 
    List, 
    Edit, 
    Create, 
    Show,
    SimpleForm,
    SimpleShowLayout, 
    TextInput, 
    NumberInput, 
    Datagrid, 
    TextField, 
    NumberField, 
    ReferenceField, 
    ReferenceInput, 
    SelectInput, 
    Filter, 
    useRecordContext, 
    required, 
    minValue, 
    maxValue,
    ShowButton,
    EditButton
} from 'react-admin';
import { Chip } from '@mui/material';

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

// Componente visual para posição
const PositionField = ({ record }) => {
    if (!record || !record.position) return null;
    
    const positions = {
        'Goalkeeper': { label: 'GR', color: 'warning' },
        'Defender': { label: 'DEF', color: 'info' },
        'Midfielder': { label: 'MED', color: 'success' },
        'Forward': { label: 'AV', color: 'error' }
    };
    
    const pos = positions[record.position] || { label: record.position, color: 'default' };
    
    return <Chip label={pos.label} color={pos.color} size="small" />;
};

export const PlayerList = (props) => (
    <List filters={<PlayerFilter />} {...props}>
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
            <PositionField source="position" label="Posição" />
            <TextField source="nationality" label="Nacionalidade" />
            <NumberField source="shirt_number" label="Nº Camisola" />
            <ReferenceField source="team_id" reference="teams" label="Equipa" link="show">
                <TextField source="name" />
            </ReferenceField>
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const PlayerShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Nome" />
            <PositionField source="position" label="Posição" />
            <TextField source="nationality" label="Nacionalidade" />
            <NumberField source="shirt_number" label="Número da Camisola" />
            
            {/* Mostrar equipa com link */}
            <ReferenceField 
                source="team_id" 
                reference="teams" 
                label="Equipa"
                link="show"
            >
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
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
                <SelectInput optionText="name" label="Equipa" validate={required()} />
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
                <SelectInput optionText="name" label="Equipa" validate={required()} />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);