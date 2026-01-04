import {
    List,
    Datagrid,
    ReferenceField,
    TextField,
    NumberField,
    Show,
    SimpleShowLayout,
    ShowButton
} from 'react-admin';
import { useTheme } from '@mui/material/styles';

export const StatsList = (props) => {
    const theme = useTheme();

    return (
        <List {...props}>
            <Datagrid
                sx={{
                    '& .RaDatagrid-headerCell': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#1976d2',
                        color: 'white',
                        fontWeight: 'bold'
                    }
                }}
            >
                <ReferenceField source="id" reference="players" label="Jogador">
                    <TextField source="name" style={{ fontWeight: 'bold' }} />
                </ReferenceField>
                <NumberField source="total_goals" label="Golos" />
                <NumberField source="total_assists" label="Assistências" />
                <NumberField source="total_yellow_cards" label="Amarelos" />
                <NumberField source="total_red_cards" label="Vermelhos" />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export const StatsShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <ReferenceField source="id" reference="players" label="Jogador">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="total_goals" label="Total Golos" />
            <NumberField source="total_assists" label="Total Assistências" />
            <NumberField source="total_yellow_cards" label="Total Cartões Amarelos" />
            <NumberField source="total_red_cards" label="Total Cartões Vermelhos" />
        </SimpleShowLayout>
    </Show>
);