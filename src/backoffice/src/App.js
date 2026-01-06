import { Admin, Resource } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { Dashboard } from "./Dashboard";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupIcon from "@mui/icons-material/Group";
import SportsIcon from "@mui/icons-material/Sports";
import StadiumIcon from '@mui/icons-material/Stadium';
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { TeamList, TeamShow, TeamEdit } from "./Team";
import { PlayerList, PlayerShow, PlayerEdit, PlayerCreate } from "./Player";
import { MatchList, MatchShow, MatchCreate, MatchEdit } from "./Match";
import { MatchEventList, MatchEventShow, MatchEventCreate, MatchEventEdit } from "./MatchEvent";
import { StandingsList } from "./Standings";
import { StatsList, StatsShow } from "./Stats";
const dataProvider = lb4Provider("http://localhost:3000");

const App = () => (
        <Admin dataProvider={dataProvider}
        dashboard={Dashboard}
        title="Champions League Manager"
        >
        <Resource 
            name="teams" 
            list={TeamList} 
            show={TeamShow}
            edit={TeamEdit}
            icon={SportsSoccerIcon}
            options={{ label: "Equipas" }}
        />
        <Resource 
            name="players" 
            list={PlayerList} 
            show={PlayerShow}
            edit={PlayerEdit}
            create={PlayerCreate}
            icon={GroupIcon}
            options={{ label: "Jogadores" }}
        />
        <Resource 
            name="matches" 
            list={MatchList} 
            show={MatchShow}
            create={MatchCreate} 
            edit={MatchEdit}
            icon={StadiumIcon}
            options={{ label: "Jogos" }}
        />
        <Resource 
            name="match-events" 
            list={MatchEventList}
            show={MatchEventShow}
            create={MatchEventCreate}
            edit={MatchEventEdit}
            icon={SportsIcon}
            options={{ label: "Acontecimentos" }}
        />
        <Resource 
            name="standings" 
            list={StandingsList}
            icon={LeaderboardIcon}
            options={{ label: "Classificação" }}
        />
        <Resource 
            name="stats" 
            list={StatsList} 
            show={StatsShow}
            icon={AssessmentIcon}
            options={{ label: "Estatísticas" }} 
        />
    </Admin>
);

export default App;