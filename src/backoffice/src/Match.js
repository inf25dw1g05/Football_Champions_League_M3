import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    DateField,
    ShowButton,
    Show,
    SimpleShowLayout,
    ReferenceManyField,
    NumberField,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

// Componente para mostrar o resultado
const ScoreField = ({ record }) => {
    if (!record) return null;
    
    const homeWin = (record.home_score || 0) > (record.away_score || 0);
    const awayWin = (record.away_score || 0) > (record.home_score || 0);
    const draw = (record.home_score || 0) === (record.away_score || 0);
    
    return (
        <Box 
            display="flex" 
            alignItems="center" 
            gap={1}
            sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: '#f5f5f5',
                fontWeight: 'bold'
            }}
        >
            <Typography 
                variant="h6" 
                sx={{ 
                    color: homeWin ? '#2e7d32' : draw ? '#ed6c02' : '#666',
                    minWidth: 30,
                    textAlign: 'center'
                }}
            >
                {record.home_score || 0}
            </Typography>
            <Typography variant="body2" sx={{ color: '#999' }}>-</Typography>
            <Typography 
                variant="h6" 
                sx={{ 
                    color: awayWin ? '#2e7d32' : draw ? '#ed6c02' : '#666',
                    minWidth: 30,
                    textAlign: 'center'
                }}
            >
                {record.away_score || 0}
            </Typography>
        </Box>
    );
};

export const MatchList = (props) => (
    <List
        {...props}
        sort={{ field: 'match_date', order: 'DESC' }}
        perPage={25}
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
            <TextField source="id" />
            <DateField 
                source="match_date" 
                label="Data" 
                showTime={false}
            />
            
            {/* IMPORTANTE: ReferenceField para mostrar NOMES, não IDs! */}
            <ReferenceField 
                source="home_team_id" 
                reference="teams" 
                label="Equipa Casa"
                link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            
            <ScoreField label="Resultado" />
            
            <ReferenceField 
                source="away_team_id" 
                reference="teams" 
                label="Equipa Fora"
                link="show"
            >
                <TextField source="name" />
            </ReferenceField>
            
            <TextField source="venue" label="Estádio" />
            
            <ShowButton />
        </Datagrid>
    </List>
);

export const MatchShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <DateField source="match_date" label="Data" showTime={false} />
            <TextField source="venue" label="Estádio" />
            
            <Box sx={{ my: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                    Resultado
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center" gap={4}>
                    <Box textAlign="center">
                        <ReferenceField 
                            source="home_team_id" 
                            reference="teams" 
                            label="Equipa Casa"
                            link="show"
                        >
                            <TextField source="name" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} />
                        </ReferenceField>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            <NumberField source="home_score" />
                        </Typography>
                        <Typography variant="h3" sx={{ color: '#999' }}>-</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            <NumberField source="away_score" />
                        </Typography>
                    </Box>
                    
                    <Box textAlign="center">
                        <ReferenceField 
                            source="away_team_id" 
                            reference="teams" 
                            label="Equipa Fora"
                            link="show"
                        >
                            <TextField source="name" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }} />
                        </ReferenceField>
                    </Box>
                </Box>
            </Box>
            
            {/* Lista de acontecimentos deste jogo */}
            <ReferenceManyField 
                label="Acontecimentos do Jogo" 
                reference="match-events" 
                target="match_id"
                sort={{ field: 'minute', order: 'ASC' }}
            >
                <Datagrid>
                    <NumberField source="minute" label="Min" />
                    <TextField source="event_type" label="Tipo" />
                    <ReferenceField 
                        source="player_id" 
                        reference="players" 
                        label="Jogador"
                        link="show"
                    >
                        <TextField source="name" />
                    </ReferenceField>
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);