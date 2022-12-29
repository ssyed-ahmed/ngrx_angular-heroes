export class Message {
    message: string;
    severity: Severity;
    timestamp: Date;
    stackTrace: string;

    constructor(message: string, severity: Severity, timestamp: Date, stackTrace: string) {
        this.message = message;
        this.severity = severity;
        this.timestamp = timestamp;
        this.stackTrace = stackTrace;
    }
}

export enum Severity {
    INFO,
    WARNING,
    DEBUG,
    ERROR,
    FATAL
}