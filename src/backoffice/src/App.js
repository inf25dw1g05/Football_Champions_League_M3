import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import lb4Provider from "react-admin-lb4";
import { TeamEdit, TeamList } from "./Team";
const dataProvider = lb4Provider("http://localhost:3000");
const App = () => (
<Admin dataProvider={dataProvider}>
<Resource name="teams" list={TeamList} edit={TeamEdit} />
</Admin>
);
export default App;