import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import lb4Provider from "react-admin-lb4";

import { TeamEdit, TeamList } from "./Team";
import { PlayerList, PlayerEdit, PlayerCreate } from "./Player";

const dataProvider = lb4Provider("http://localhost:3000");
const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="teams" list={TeamList} edit={TeamEdit} />
        <Resource name="players" list={PlayerList} edit={PlayerEdit} create={PlayerCreate} />
    </Admin>
);
export default App;