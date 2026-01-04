import {
    List,
    Datagrid,
    TextField,
    NumberField,
    SelectInput,
    useRecordContext,
} from 'react-admin';
import { useTheme } from '@mui/material/styles';

const standingsFilters = [
    <SelectInput 
        source="group_name" 
        label="Grupo" 
        alwaysOn 
        choices={[
            { id: 'A', name: 'Grupo A' },
            { id: 'B', name: 'Grupo B' },
            { id: 'C', name: 'Grupo C' },
            { id: 'D', name: 'Grupo D' },
            { id: 'E', name: 'Grupo E' },
            { id: 'F', name: 'Grupo F' },
            { id: 'G', name: 'Grupo G' },
            { id: 'H', name: 'Grupo H' },
        ]}
    />
];

const PointsField = () => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <span style={{ fontWeight: 'bold', color: '#1976d2' }}>
            {record.points ?? 0}
        </span>
    );
};

const GoalDifferenceField = () => {
    const record = useRecordContext();
    if (!record) return null;

    const diff = record.goal_diff || 0;
    
    let color = 'inherit';
    if (diff > 0) color = 'green';
    if (diff < 0) color = 'red';

    return (
        <span style={{ color: color, fontWeight: 'bold' }}>
            {diff > 0 ? '+' : ''}{diff}
        </span>
    );
};

export const StandingsList = (props) => {
    const theme = useTheme();

    return (
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
                        backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#1976d2',
                        color: 'white'
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
};