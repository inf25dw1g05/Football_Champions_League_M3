import { Card, CardContent, CardHeader, Grid, Typography, Box } from '@mui/material';
import { useGetList } from 'react-admin';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupIcon from '@mui/icons-material/Group';
import SportsIcon from '@mui/icons-material/Sports';

const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ 
        height: '100%', 
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        borderLeft: `4px solid ${color}`
    }}>
        <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                    <Typography color="textSecondary" gutterBottom variant="overline">
                        {title}
                    </Typography>
                    <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color }}>
                        {value}
                    </Typography>
                </Box>
                <Box sx={{ fontSize: 60, color, opacity: 0.3 }}>
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

export const Dashboard = () => {
    const { data: standings, isLoading } = useGetList('standings', {
        pagination: { page: 1, perPage: 3 },
        sort: { field: 'points', order: 'DESC' }
    });

    const { data: teams } = useGetList('teams', {
        pagination: { page: 1, perPage: 100 }
    });

    const { data: players } = useGetList('players', {
        pagination: { page: 1, perPage: 1000 }
    });

    const { data: matches } = useGetList('matches', {
        pagination: { page: 1, perPage: 100 }
    });

    const totalGoals = matches?.reduce(
    (sum, match) => sum + ( match.home_score|| 0)+ (match.away_score|| 0),
        0
    ) || 0;


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
                🏆 Champions League - Dashboard
            </Typography>

            {/* Cards de Estatísticas */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total de Equipas" 
                        value={teams?.length || 0}
                        icon={<SportsSoccerIcon />}
                        color="#1976d2"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total de Jogadores" 
                        value={players?.length || 0}
                        icon={<GroupIcon />}
                        color="#2e7d32"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Jogos Realizados" 
                        value={matches?.length || 0}
                        icon={<SportsIcon />}
                        color="#ed6c02"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard 
                        title="Total de Golos" 
                        value={totalGoals}
                        icon={<EmojiEventsIcon />}
                        color="#d32f2f"
                    />
                </Grid>
            </Grid>

            {/* Top 3 Equipas */}
            <Card>
                <CardHeader 
                    title="🥇 Top 3 Equipas" 
                    sx={{ 
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        '& .MuiCardHeader-title': { fontWeight: 'bold' }
                    }}
                />
                <CardContent>
                    {isLoading ? (
                        <Typography>A carregar...</Typography>
                    ) : (
                        <Grid container spacing={2}>
                            {standings?.slice(0, 3).map((team, index) => (
                                <Grid item xs={12} key={team.id}>
                                    <Card 
                                        variant="outlined" 
                                        sx={{ 
                                            p: 2,
                                            background: index === 0 ? '#ffd70022' : 
                                                       index === 1 ? '#c0c0c022' : 
                                                       '#cd7f3222',
                                            borderLeft: `4px solid ${
                                                index === 0 ? '#ffd700' : 
                                                index === 1 ? '#c0c0c0' : 
                                                '#cd7f32'
                                            }`
                                        }}
                                    >
                                        <Box display="flex" justifyContent="space-between" alignItems="center">
                                            <Box display="flex" alignItems="center" gap={2}>
                                                <Typography variant="h4" sx={{ fontWeight: 'bold', opacity: 0.3 }}>
                                                    #{index + 1}
                                                </Typography>
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                        {team.team_name}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary">
                                                        Grupo {team.group_name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box textAlign="right">
                                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                                    {team.points} pts
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {team.played}J • {team.win}V • {team.draw}E • {team.loss}D
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Golos: {team.goals_for} - {team.goals_against} 
                                                    ({team.goal_diff > 0 ? '+' : ''}{team.goal_diff})
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
};