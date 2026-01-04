import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    DateField,
    NumberField,
    Create,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    DateTimeInput,
    TextInput,
    NumberInput,
    Show,
    SimpleShowLayout,
    ReferenceManyField,
    EditButton,
    ShowButton,
    useRecordContext
} from 'react-admin';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ScoreField = () => {
    const record = useRecordContext();
    if (!record) return null;
    
    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            <span>{record.home_score || 0}</span>
            <span>-</span>
            <span>{record.away_score || 0}</span>
        </div>
    );
};

export const MatchList = (props) => {
    const theme = useTheme();

    return (
        <List {...props}>
            <Datagrid 
                rowClick="show"
                sx={{
                    '& .RaDatagrid-headerCell': {
                        backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#1976d2',
                        color: 'white',
                        fontWeight: 'bold'
                    }
                }}
            >
                <TextField source="id" />
                <DateField source="match_date" showTime label="Data" />
                <TextField source="venue" label="Estádio" />
                <ReferenceField source="home_team_id" reference="teams" label="Casa">
                    <TextField source="name" />
                </ReferenceField>
                <ScoreField label="Res" />
                <ReferenceField source="away_team_id" reference="teams" label="Fora">
                    <TextField source="name" />
                </ReferenceField>
                <EditButton />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export const MatchShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <DateField source="match_date" showTime />
            <TextField source="venue" />
            
            <Box sx={{ 
                border: '1px solid #ccc', 
                padding: '20px', 
                margin: '10px 0', 
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.05)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '20px' }}>
                    <div>
                        <ReferenceField source="home_team_id" reference="teams" link="show">
                            <TextField source="name" style={{ fontWeight: 'bold' }} />
                        </ReferenceField>
                        <br/>
                        <span style={{ fontSize: '30px' }}>{props.record?.home_score}</span>
                    </div>
                    <div style={{ alignSelf: 'center' }}>-</div>
                    <div>
                        <ReferenceField source="away_team_id" reference="teams" link="show">
                            <TextField source="name" style={{ fontWeight: 'bold' }} />
                        </ReferenceField>
                        <br/>
                        <span style={{ fontSize: '30px' }}>{props.record?.away_score}</span>
                    </div>
                </div>
            </Box>

            <ReferenceManyField label="Eventos" reference="match-events" target="match_id">
                <Datagrid>
                    <NumberField source="minute" label="Min" />
                    <TextField source="event_type" label="Tipo" />
                    <ReferenceField source="player_id" reference="players">
                        <TextField source="name" />
                    </ReferenceField>
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);

export const MatchCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <DateTimeInput source="match_date" />
            <TextInput source="venue" />
            <ReferenceInput source="home_team_id" reference="teams">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="away_team_id" reference="teams">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="home_score" defaultValue={0} />
            <NumberInput source="away_score" defaultValue={0} />
        </SimpleForm>
    </Create>
);

export const MatchEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <DateTimeInput source="match_date" />
            <TextInput source="venue" />
            <ReferenceInput source="home_team_id" reference="teams">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="away_team_id" reference="teams">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <NumberInput source="home_score" />
            <NumberInput source="away_score" />
        </SimpleForm>
    </Edit>
);