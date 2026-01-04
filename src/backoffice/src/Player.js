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
import { useTheme } from '@mui/material/styles';

const PostTitle = () => {
    const record = useRecordContext();
    return record ? (<span>Jogador: {`${record.name}`}</span>) : null;
}

const PlayerFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Pesquisar por Nome" source="name" alwaysOn />
        
        <SelectInput source="position" label="Posição" choices={[
            { id: 'Goalkeeper', name: 'Guarda-Redes (GR)' },
            { id: 'Defender', name: 'Defesa (DEF)' },
            { id: 'Midfielder', name: 'Médio (MED)' },
            { id: 'Forward', name: 'Avançado (AV)' },
        ]} />

        <SelectInput source="nationality" label="Nacionalidade" choices={[
            { id: 'Portugal', name: 'Portugal' },
            { id: 'Brazil', name: 'Brasil' },
            { id: 'Spain', name: 'Espanha' },
            { id: 'France', name: 'França' },
            { id: 'Germany', name: 'Alemanha' },
            { id: 'England', name: 'Inglaterra' },
            { id: 'Italy', name: 'Itália' },
            { id: 'Argentina', name: 'Argentina' },
            { id: 'Netherlands', name: 'Holanda' },
            { id: 'Belgium', name: 'Bélgica' },
        ]} />

        <ReferenceInput label="Equipa" source="team_id" reference="teams">
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);

const PositionField = () => {
    const record = useRecordContext();
    if (!record || !record.position) return null;
    
    let label = record.position;
    let color = 'default';

    if (record.position === 'Goalkeeper') {
        label = 'GR';
        color = 'warning';
    } else if (record.position === 'Defender') {
        label = 'DEF';
        color = 'info';
    } else if (record.position === 'Midfielder') {
        label = 'MED';
        color = 'success';
    } else if (record.position === 'Forward') {
        label = 'AV';
        color = 'error';
    }
    
    return <Chip label={label} color={color} size="small" variant="outlined" />;
};

export const PlayerList = (props) => {
    const theme = useTheme();

    return (
        <List filters={<PlayerFilter />} {...props}>
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
                <PositionField label="Posição" />
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
};

export const PlayerShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Nome" />
            <PositionField label="Posição" />
            <TextField source="nationality" label="Nacionalidade" />
            <NumberField source="shirt_number" label="Número da Camisola" />
            
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
            
            <SelectInput source="position" label="Posição" choices={[
                { id: 'Goalkeeper', name: 'Guarda-Redes' },
                { id: 'Defender', name: 'Defesa' },
                { id: 'Midfielder', name: 'Médio' },
                { id: 'Forward', name: 'Avançado' },
            ]} />
            
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
            
            <SelectInput source="position" label="Posição" choices={[
                { id: 'Goalkeeper', name: 'Guarda-Redes' },
                { id: 'Defender', name: 'Defesa' },
                { id: 'Midfielder', name: 'Médio' },
                { id: 'Forward', name: 'Avançado' },
            ]} />

            <TextInput source="nationality" label="Nacionalidade" />
            <NumberInput source="shirt_number" label="Nº Camisola" validate={[required(), minValue(1), maxValue(99)]} />
            <ReferenceInput source="team_id" reference="teams">
                <SelectInput optionText="name" label="Equipa" validate={required()} />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);