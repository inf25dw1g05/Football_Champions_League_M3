import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { Dashboard } from "./Dashboard";

// Ícones
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupIcon from "@mui/icons-material/Group";
import SportsIcon from "@mui/icons-material/Sports";
import StadiumIcon from '@mui/icons-material/Stadium';
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

// Importar recursos
import { TeamList, TeamShow, TeamEdit } from "./Team";
import { PlayerList, PlayerShow, PlayerEdit, PlayerCreate } from "./Player";
import { MatchList, MatchShow } from "./Match";
import { MatchEventList, MatchEventShow } from "./MatchEvent";
import { StandingsList } from "./Standings";

const App = () => (
    <Admin 
        dataProvider={dataProvider} 
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
            icon={StadiumIcon}
            options={{ label: "Jogos" }}
        />
        <Resource 
            name="match-events" 
            list={MatchEventList}
            show={MatchEventShow}
            icon={SportsIcon}
            options={{ label: "Acontecimentos" }}
        />
        <Resource 
            name="standings" 
            list={StandingsList}
            icon={LeaderboardIcon}
            options={{ label: "Classificação" }}
        />
    </Admin>
);
export default App;