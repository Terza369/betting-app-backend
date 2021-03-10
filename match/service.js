module.exports = class MatchService {
    
    static parseSkip(skip) {
        skip = skip ? parseInt(skip) : 0;
        return skip;
    }

    static parseLimit(limit) {
        limit = limit ? parseInt(limit) : 50;
        limit = Math.min(limit, 50);
        return limit;
    }

    static parseFields(fields, populate) {
        let fieldsObj = {};
        if(fields) {
            fields = fields.split(',');
            fields.forEach(field => {
                fieldsObj[field] = 1;
            });
        } else {
            if(populate) {
                fieldsObj = {startTime: 1, odds: 1, teams: 1, sport: 1, tournament: 1, duration: 1};
            } else {
                fieldsObj = {};
            }
        }
        return fieldsObj;
    }

    static createDateTime(date, hours, minutes, seconds) {
        let startTime = new Date(date)
        startTime.setHours(hours || 0);
        startTime.setMinutes(minutes || 0);
        startTime.setSeconds(seconds || 0);
        return startTime;
    }

    static randomizeOdds(max, min) {
        let odds = (Math.random() * (max - min) + min);
        odds = Math.round((odds) * 100) / 100;
        return odds;
    }

    static calculateMinutes(match) {
        let startTime = new Date(match.startTime);
        let timePassed = Date.now() - startTime;
        timePassed = Math.floor(timePassed / 60000);
        timePassed = Math.max(timePassed, 0);

        if(timePassed > match.duration) {
            match.finished = true;
            match.minute = match.duration
        } else {
            match.finished = false;
            match.minute = timePassed; 
        }

        return match;
    }

    static resetScore(match) {
        match.score = [0, 0];
        return match;
    }

    static getUniqueSports(sports, matches) {
        let uniqueSportIds = matches.map(match => match.sportId.toString());
        uniqueSportIds = [...new Set(uniqueSportIds)];

        let uniqueSports = [];
        uniqueSportIds.forEach(uniqueSportId => {
            sports.forEach(sport => {
            if(sport._id.toString() === uniqueSportId.toString()) {
                uniqueSports.push(sport);
            }
            })
        });

        return uniqueSports;
    }

    static getUniqueTournaments(tournaments, matches) {
        let uniqueTournamentIds = matches.map(match => match.tournamentId.toString());
        uniqueTournamentIds = [...new Set(uniqueTournamentIds)];


        let uniqueTournaments = [];
        uniqueTournamentIds.forEach(uniqueTournamentId => {
            tournaments.forEach(tournament => {
            if(tournament._id.toString() === uniqueTournamentId.toString()) {
                uniqueTournaments.push(tournament);
            }
            })
        });

        return uniqueTournaments;
    }

    static incrementScores(match) {
        if(new Date(match.startTime) > new Date() || match.finished) {
            return match;
        } else {
            let teamSelector = Math.round(Math.random());
            match.score[teamSelector] += 1;
            return match;
        }
    }
}