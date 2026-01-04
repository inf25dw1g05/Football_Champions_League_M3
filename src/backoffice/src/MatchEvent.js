import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    NumberField,
    Create,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    NumberInput,
    Show,
    SimpleShowLayout,
    EditButton,
    ShowButton,
    TextInput,
    useRecordContext
} from 'react-admin';
import { Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const EventTypeField = () => {
    const record = useRecordContext();
    if (!record) return null;
    
    let chipColor = 'default';
    let labelTexto = record.event_type;

    if (record.event_type === 'Goal') {
        chipColor = 'success';
        labelTexto = 'Golo';
    } else if (record.event_type === 'Assist') {
        chipColor = 'primary';
        labelTexto = 'Assistência';
    } else if (record.event_type === 'Yellow Card') {
        chipColor = 'warning';
        labelTexto = 'Cartão Amarelo';
    } else if (record.event_type === 'Red Card') {
        chipColor = 'error';
        labelTexto = 'Cartão Vermelho';
    }

    return (
        <Chip 
            label={labelTexto} 
            color={chipColor} 
            size="small" 
            variant="outlined" 
        />
    );
};

export const MatchEventList = (props) => {
    const theme = useTheme();

    return (
        <List {...props}>
            <Datagrid 
                rowClick="show"
                sx={{
                    '& .RaDatagrid-headerCell': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#1976d2',
                        color: 'white',
                        fontWeight: 'bold'
                    }
                }}
            >
                <TextField source="id" />
                <ReferenceField source="match_id" reference="matches" label="Jogo">
                    <TextField source="id" />
                </ReferenceField>
                <NumberField source="minute" label="Minuto" />
                <EventTypeField source="event_type" label="Evento" />
                <ReferenceField source="player_id" reference="players" label="Jogador">
                    <TextField source="name" />
                </ReferenceField>
                <EditButton />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export const MatchEventShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="match_id" reference="matches">
                <TextField source="id" />
            </ReferenceField>
            <NumberField source="minute" />
            <EventTypeField source="event_type" />
            <ReferenceField source="player_id" reference="players">
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);

export const MatchEventCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput source="match_id" reference="matches">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput source="player_id" reference="players">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <SelectInput source="event_type" choices={[
                { id: 'Goal', name: 'Golo' },
                { id: 'Assist', name: 'Assistência' },
                { id: 'Yellow Card', name: 'Cartão Amarelo' },
                { id: 'Red Card', name: 'Cartão Vermelho' },
            ]} />
            <NumberInput source="minute" />
        </SimpleForm>
    </Create>
);

export const MatchEventEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="match_id" reference="matches">
                <SelectInput optionText="id" />
            </ReferenceInput>
            <ReferenceInput source="player_id" reference="players">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <SelectInput source="event_type" choices={[
                { id: 'Goal', name: 'Golo' },
                { id: 'Assist', name: 'Assistência' },
                { id: 'Yellow Card', name: 'Cartão Amarelo' },
                { id: 'Red Card', name: 'Cartão Vermelho' },
            ]} />
            <NumberInput source="minute" />
        </SimpleForm>
    </Edit>
);