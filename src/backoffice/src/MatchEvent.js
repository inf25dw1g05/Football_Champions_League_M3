import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    NumberField,
    ShowButton,
    Show,
    SimpleShowLayout,
    SelectInput,
    Filter,
} from 'react-admin';
import { Chip, Box } from '@mui/material';

// Filtros
const EventFilter = (props) => (
    <Filter {...props}>
        <SelectInput 
            source="event_type" 
            label="Tipo de Evento" 
            choices={[
                { id: 'Goal', name: '⚽ Golo' },
                { id: 'Assist', name: '🅰️ Assistência' },
                { id: 'Yellow Card', name: '🟨 Cartão Amarelo' },
                { id: 'Red Card', name: '🟥 Cartão Vermelho' },
            ]}
            alwaysOn
        />
    </Filter>
);

// Componente para tipo de evento
const EventTypeField = ({ record }) => {
    if (!record) return null;
    
    const eventTypes = {
        'Goal': { label: '⚽ Golo', color: 'success' },
        'Assist': { label: '🅰️ Assistência', color: 'info' },
        'Yellow Card': { label: '🟨 Amarelo', color: 'warning' },
        'Red Card': { label: '🟥 Vermelho', color: 'error' }
    };
    
    const event = eventTypes[record.event_type] || { 
        label: record.event_type, 
        color: 'default' 
    };
    
    return <Chip label={event.label} color={event.color} size="small" />;
};

// Componente para o minuto
const MinuteField = ({ record }) => {
    if (!record) return null;
    
    return (
        <Box
            sx={{
                display: 'inline-block',
                backgroundColor: '#1976d2',
                color: 'white',
                padding: '4px 8px',
                borderRadius: 1,
                fontWeight: 'bold',
                fontSize: '0.875rem'
            }}
        >
            {record.minute}'
        </Box>
    );
};

export const MatchEventList = (props) => (
    <List
        {...props}
        filters={<EventFilter />}
        sort={{ field: 'minute', order: 'ASC' }}
        perPage={50}
    >
        <Datagrid
            rowClick="show"
            sx={{
                '& .RaDatagrid-headerCell': {
                    fontWeight: 'bold',
                    backgroundColor: 'gray'
                }
            }}
        >
            <TextField source="id" label="ID" />
            
            <ReferenceField 
                source="match_id" 
                reference="matches" 
                label="Jogo"
                link="show"
            >
                <TextField source="id" />
            </ReferenceField>
            
            <MinuteField source="minute" label="Minuto" />
            <EventTypeField source="event_type" label="Tipo" />
            
            <ReferenceField 
                source="player_id" 
                reference="players" 
                label="Jogador"
                link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            
            <ShowButton />
        </Datagrid>
    </List>
);

export const MatchEventShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <MinuteField source="minute" label="Minuto" />
            <EventTypeField source="event_type" label="Tipo de Evento" />
            
            <ReferenceField 
                source="player_id" 
                reference="players" 
                label="Jogador"
                link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            
            <ReferenceField 
                source="match_id" 
                reference="matches" 
                label="Jogo"
                link="show"
            >
                <TextField source="id" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);