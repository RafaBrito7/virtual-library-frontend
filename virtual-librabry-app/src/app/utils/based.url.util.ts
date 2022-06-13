export abstract class BasedUrlUtil {     
    private static url = "http://ec2-184-72-114-28.compute-1.amazonaws.com";

    private static backPort = ':8080'

    private static api = '/api';

    public static getBasedUrlUser(): string {
      return this.url + this.backPort + this.api + '/user';
    }

    public static getBasedUrlBook(): string {
        return this.url + this.backPort + this.api + '/book';
    }

    public static getBasedUrl(){
        return this.url + this.backPort;
    }
}