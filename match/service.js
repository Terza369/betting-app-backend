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
}