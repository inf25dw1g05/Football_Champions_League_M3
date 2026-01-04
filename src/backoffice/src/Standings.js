import {
    List,
    Datagrid,
    TextField,
    NumberField,
    TextInput,
    useRecordContext,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

// Filtros
const standingsFilters = [
    <TextInput source="group_name" label="Grupo" alwaysOn />
];


// Componente para pontos
const PointsField = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Typography 
            variant="h6" 
            sx={{ 
                color: 'white'
            }}
        >
            {record.points ?? 0}
        </Typography>
    );
};

// Componente para diferença de golos
const GoalDifferenceField = () => {
    const record = useRecordContext();
    if (!record) return null;

    const diff = record.goal_diff || 0;
    const color = diff > 0 ? '#2e7d32' : diff < 0 ? '#d32f2f' : '#666';

    return (
        <Typography 
            sx={{ 
                color,
                fontWeight: 'bold'
            }}
        >
            {diff > 0 ? '+' : ''}{diff}
        </Typography>
    );
};

// LISTA DE CLASSIFICAÇÃO
export const StandingsList = (props) => (
    <List
        {...props}
        filters={standingsFilters}
        sort={{ field: 'points', order: 'DESC' }}
        perPage={50}
        pagination={false}
    >
        <Datagrid
            bulkActionButtons={false}
            sx={{
                '& .RaDatagrid-headerCell': {
                    fontWeight: 'bold',
                    backgroundColor: '#1976d2',
                    color: 'white'
                },
                '& .RaDatagrid-rowCell': {
                    fontSize: '0.95rem'
                }
            }}
        >
            <TextField 
                source="team_name" 
                label="Equipa" 
                sx={{ fontWeight: 'bold' }} 
            />
            
            <TextField source="group_name" label="Grupo" />
            
            <PointsField label="Pts" />
            
            <NumberField source="played" label="J" />
            <NumberField source="win" label="V" />
            <NumberField source="draw" label="E" />
            <NumberField source="loss" label="D" />
            
            <NumberField source="goals_for" label="GM" />
            <NumberField source="goals_against" label="GS" />
            <GoalDifferenceField label="DG" />
        </Datagrid>
    </List>
);
