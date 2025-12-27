CREATE SCHEMA IF NOT EXISTS champions_league;
USE champions_league;

CREATE TABLE IF NOT EXISTS team (
 team_id INT AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL UNIQUE,
 country VARCHAR(50),
 coach VARCHAR(100),
 group_name CHAR(1),
 PRIMARY KEY (team_id),
 CONSTRAINT ck1_team
 CHECK (group_name IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'))
);

CREATE TABLE IF NOT EXISTS player (
  player_id INT AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  position VARCHAR(50),
  nationality VARCHAR(50),
  team_id INT NOT NULL,
  shirt_number INT,
  PRIMARY KEY (player_id),
  CONSTRAINT fk1_player
  FOREIGN KEY (team_id) REFERENCES team(team_id),
  CONSTRAINT chk_shirt_number
  CHECK (shirt_number >= 1 AND shirt_number <= 99),
  CONSTRAINT uk_team_shirt_number
  UNIQUE (team_id, shirt_number)
);

CREATE TABLE IF NOT EXISTS `match` (
  match_id INT AUTO_INCREMENT,
  home_team_id INT NOT NULL,
  away_team_id INT NOT NULL,
  match_date TIMESTAMP,
  venue VARCHAR(100),
  home_score INT DEFAULT 0,
  away_score INT DEFAULT 0,
  PRIMARY KEY (match_id),
  CONSTRAINT fk1_match
  FOREIGN KEY (home_team_id) REFERENCES team(team_id),
  CONSTRAINT fk2_match
  FOREIGN KEY (away_team_id) REFERENCES team(team_id),
  CONSTRAINT ck1_match
  CHECK (home_score >= 0 AND away_score >= 0),
 CONSTRAINT ck2_match
 CHECK (home_team_id <> away_team_id)
);

CREATE TABLE IF NOT EXISTS match_event (
 event_id INT AUTO_INCREMENT,
 match_id INT NOT NULL,
 player_id INT NOT NULL,
 event_type ENUM('Goal', 'Yellow Card', 'Red Card', 'Assist') NOT NULL,
 `minute` INT,
 PRIMARY KEY (event_id),
 CONSTRAINT fk1_match_event
 FOREIGN KEY (match_id) REFERENCES `match`(match_id),
 CONSTRAINT fk2_match_event
 FOREIGN KEY (player_id) REFERENCES player(player_id),
 CONSTRAINT ck1_match_event
 CHECK (`minute` >= 1 AND `minute` <= 90)
);

-- Tabela 'stats' -> tabela nova em relação à BD usada no M2
CREATE TABLE IF NOT EXISTS stats (
  player_id INT NOT NULL,
  total_goals INT DEFAULT 0,
  total_assists INT DEFAULT 0,
  total_yellow_cards INT DEFAULT 0,
  total_red_cards INT DEFAULT 0,
  PRIMARY KEY (player_id),
  CONSTRAINT fk_stats_player
  FOREIGN KEY (player_id) REFERENCES player(player_id)
  ON DELETE CASCADE
);

-- Tabela 'standings' -> tabela nova em relação à BD usada no M2

CREATE TABLE IF NOT EXISTS standings (
    team_id INT NOT NULL,
    group_name VARCHAR(100),
    team_name VARCHAR(100) NOT NULL,
    points INT DEFAULT 0,
    goal_diff INT DEFAULT 0,
    goals_for INT DEFAULT 0,
    goals_against INT DEFAULT 0,
    played INT DEFAULT 0,
    win INT DEFAULT 0,
    draw INT DEFAULT 0,
    loss INT DEFAULT 0,
    PRIMARY KEY (team_id),
    CONSTRAINT fk1_team FOREIGN KEY (team_id) REFERENCES team(team_id)
);

-- Triggers para atualizar a tabela 'stats' automaticamente

DELIMITER $$

-- 1º Trigger: "inicia" os jogadores
-- Ao inserir um jogador, cria a entrada na tabela stats com valores a 0,
-- garantindo que todos os jogadores têm uma linha na tabela stats, mesmo não tendo eventos associados.
CREATE TRIGGER after_player_insert
AFTER INSERT ON player
FOR EACH ROW
BEGIN
    INSERT INTO stats (player_id, total_goals, total_assists, total_yellow_cards, total_red_cards)
    VALUES (NEW.player_id, 0, 0, 0, 0);
END $$

-- 2º Trigger: Somar eventos
-- Quando acontece um evento, atualizamos a linha do jogador correspondente
CREATE TRIGGER after_match_event_insert
AFTER INSERT ON match_event
FOR EACH ROW
BEGIN
    UPDATE stats 
    SET 
        total_goals = total_goals + (NEW.event_type = 'Goal'),
        total_assists = total_assists + (NEW.event_type = 'Assist'),
        total_yellow_cards = total_yellow_cards + (NEW.event_type = 'Yellow Card'),
        total_red_cards = total_red_cards + (NEW.event_type = 'Red Card')
    WHERE player_id = NEW.player_id;
END $$

-- 3º Trigger: Eliminar eventos
-- Usado caso um evento seja removido
CREATE TRIGGER after_match_event_delete
AFTER DELETE ON match_event
FOR EACH ROW
BEGIN
    UPDATE stats 
    SET 
        total_goals = total_goals - (OLD.event_type = 'Goal'),
        total_assists = total_assists - (OLD.event_type = 'Assist'),
        total_yellow_cards = total_yellow_cards - (OLD.event_type = 'Yellow Card'),
        total_red_cards = total_red_cards - (OLD.event_type = 'Red Card')
    WHERE player_id = OLD.player_id;
END $$

-- 4º Trigger: Editar eventos
-- Usado caso um evento seja alterado - por exemplo, mudar um evento de "Assist" para "Goal"
CREATE TRIGGER after_match_event_update
AFTER UPDATE ON match_event
FOR EACH ROW
BEGIN
    -- remoção dos valores antigos
    UPDATE stats 
    SET 
        total_goals = total_goals - (OLD.event_type = 'Goal'),
        total_assists = total_assists - (OLD.event_type = 'Assist'),
        total_yellow_cards = total_yellow_cards - (OLD.event_type = 'Yellow Card'),
        total_red_cards = total_red_cards - (OLD.event_type = 'Red Card')
    WHERE player_id = OLD.player_id;

    -- adição dos novos valores
    UPDATE stats 
    SET 
        total_goals = total_goals + (NEW.event_type = 'Goal'),
        total_assists = total_assists + (NEW.event_type = 'Assist'),
        total_yellow_cards = total_yellow_cards + (NEW.event_type = 'Yellow Card'),
        total_red_cards = total_red_cards + (NEW.event_type = 'Red Card')
    WHERE player_id = NEW.player_id;
END $$

DELIMITER ;
-- Triggers para atualizar a tabela 'standings' automaticamente
DELIMITER $$
CREATE TRIGGER after_team_insert_standings
AFTER INSERT ON team
FOR EACH ROW
BEGIN
    INSERT INTO standings (team_id, group_name, team_name, points, goal_diff, goals_for, goals_against, played, win, draw, loss)
    VALUES (NEW.team_id, NEW.group_name, NEW.name, 0, 0, 0, 0, 0, 0, 0, 0);
END $$

CREATE TRIGGER after_team_update_standings
AFTER UPDATE ON team
FOR EACH ROW
BEGIN
    IF OLD.name <> NEW.name OR OLD.group_name <> NEW.group_name THEN
        UPDATE standings
        SET 
            team_name = NEW.name,
            group_name = NEW.group_name
        WHERE team_id = NEW.team_id;
    END IF;
END $$

-- Aqui usamos before senao a db reclama de foregein key
CREATE TRIGGER before_team_delete_standings
BEFORE DELETE ON team
FOR EACH ROW
BEGIN
    DELETE FROM standings WHERE team_id = OLD.team_id;
END $$

CREATE TRIGGER after_match_insert_standings
AFTER INSERT ON `match`
FOR EACH ROW
BEGIN
    -- Equipa da casa
    UPDATE standings 
    SET
        played = played + 1,
        goals_for = goals_for + NEW.home_score,
        goals_against = goals_against + NEW.away_score,
        goal_diff = goal_diff + (NEW.home_score - NEW.away_score),
        win = win + (CASE WHEN NEW.home_score > NEW.away_score THEN 1 ELSE 0 END),
        draw = draw + (CASE WHEN NEW.home_score = NEW.away_score THEN 1 ELSE 0 END),
        loss = loss + (CASE WHEN NEW.home_score < NEW.away_score THEN 1 ELSE 0 END),
        points = points + (CASE WHEN NEW.home_score > NEW.away_score THEN 3 WHEN NEW.home_score = NEW.away_score THEN 1 ELSE 0 END)
    WHERE team_id = NEW.home_team_id;

    -- Equipa Visitante
    UPDATE standings 
    SET
        played = played + 1,
        goals_for = goals_for + NEW.away_score,
        goals_against = goals_against + NEW.home_score,
        goal_diff = goal_diff + (NEW.away_score - NEW.home_score),
        win = win + (CASE WHEN NEW.away_score > NEW.home_score THEN 1 ELSE 0 END),
        draw = draw + (CASE WHEN NEW.away_score = NEW.home_score THEN 1 ELSE 0 END),
        loss = loss + (CASE WHEN NEW.away_score < NEW.home_score THEN 1 ELSE 0 END),
        points = points + (CASE WHEN NEW.away_score > NEW.home_score THEN 3 WHEN NEW.away_score = NEW.home_score THEN 1 ELSE 0 END)
    WHERE team_id = NEW.away_team_id;
END $$

CREATE TRIGGER after_match_update_standings
AFTER UPDATE ON `match`
FOR EACH ROW
BEGIN
    IF OLD.home_score <> NEW.home_score OR OLD.away_score <> NEW.away_score THEN
        -- Equipa da casa
        UPDATE standings 
        SET
            goals_for = goals_for - OLD.home_score  + NEW.home_score,
            goals_against = goals_against - OLD.away_score + NEW.away_score,
            goal_diff = goal_diff - (OLD.home_score - OLD.away_score) + (NEW.home_score - NEW.away_score),
            win = win - (CASE WHEN OLD.home_score > OLD.away_score THEN 1 ELSE 0 END)  + (CASE WHEN NEW.home_score > NEW.away_score THEN 1 ELSE 0 END),
            draw = draw - (CASE WHEN OLD.home_score = OLD.away_score THEN 1 ELSE 0 END) + (CASE WHEN NEW.home_score = NEW.away_score THEN 1 ELSE 0 END),
            loss = loss - (CASE WHEN OLD.home_score < OLD.away_score THEN 1 ELSE 0 END) + (CASE WHEN NEW.home_score < NEW.away_score THEN 1 ELSE 0 END),
            points = points - (CASE WHEN OLD.home_score > OLD.away_score THEN 3 WHEN OLD.home_score = OLD.away_score THEN 1 ELSE 0 END) + (CASE WHEN NEW.home_score > NEW.away_score THEN 3 WHEN NEW.home_score = NEW.away_score THEN 1 ELSE 0 END)
        WHERE team_id = NEW.home_team_id;

        -- Equipa Visitante
        UPDATE standings 
        SET
            goals_for = goals_for - OLD.away_score + NEW.away_score,
            goals_against = goals_against - OLD.home_score + NEW.home_score,
            goal_diff = goal_diff - (OLD.away_score - OLD.home_score) + (NEW.away_score - NEW.home_score),
            win = win - (CASE WHEN OLD.away_score > OLD.home_score THEN 1 ELSE 0 END) + (CASE WHEN NEW.away_score > NEW.home_score THEN 1 ELSE 0 END),
            draw = draw - (CASE WHEN OLD.away_score = OLD.home_score THEN 1 ELSE 0 END) + (CASE WHEN NEW.away_score = NEW.home_score THEN 1 ELSE 0 END),
            loss = loss - (CASE WHEN OLD.away_score < OLD.home_score THEN 1 ELSE 0 END) + (CASE WHEN NEW.away_score < NEW.home_score THEN 1 ELSE 0 END),
            points = points - (CASE WHEN OLD.away_score > OLD.home_score THEN 3 WHEN OLD.away_score = OLD.home_score THEN 1 ELSE 0 END) + (CASE WHEN NEW.away_score > NEW.home_score THEN 3 WHEN NEW.away_score = NEW.home_score THEN 1 ELSE 0 END)
        WHERE team_id = NEW.away_team_id;
    END IF;
END $$

CREATE TRIGGER after_match_delete_standings
AFTER DELETE ON `match`
FOR EACH ROW
BEGIN
    -- Equipa da casa
    UPDATE standings 
    SET
        played = played - 1,
        goals_for = goals_for - OLD.home_score,
        goals_against = goals_against - OLD.away_score,
        goal_diff = goal_diff - (OLD.home_score - OLD.away_score),
        win = win - (CASE WHEN OLD.home_score > OLD.away_score THEN 1 ELSE 0 END),
        draw = draw - (CASE WHEN OLD.home_score = OLD.away_score THEN 1 ELSE 0 END),
        loss = loss - (CASE WHEN OLD.home_score < OLD.away_score THEN 1 ELSE 0 END),
        points = points - (CASE WHEN OLD.home_score > OLD.away_score THEN 3 WHEN OLD.home_score = OLD.away_score THEN 1 ELSE 0 END)
    WHERE team_id = OLD.home_team_id;

    -- Equipa Visitante
    UPDATE standings 
    SET
        played = played - 1,
        goals_for = goals_for - OLD.away_score,
        goals_against = goals_against - OLD.home_score,
        goal_diff = goal_diff - (OLD.away_score - OLD.home_score),
        win = win - (CASE WHEN OLD.away_score > OLD.home_score THEN 1 ELSE 0 END),
        draw = draw - (CASE WHEN OLD.away_score = OLD.home_score THEN 1 ELSE 0 END),
        loss = loss - (CASE WHEN OLD.away_score < OLD.home_score THEN 1 ELSE 0 END),
        points = points - (CASE WHEN OLD.away_score > OLD.home_score THEN 3 WHEN OLD.away_score = OLD.home_score THEN 1 ELSE 0 END)
    WHERE team_id = OLD.away_team_id;
END $$

DELIMITER ;
