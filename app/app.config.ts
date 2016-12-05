import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from './config/configService';
import { TblColabAdmin } from './config/TblColabAdmin';
import { Message } from 'primeng/primeng';

@Component({
    templateUrl: 'app/app.config.html',
    selector: 'config-app',
    providers: [ConfigService]
})
export class AppConfig implements OnInit {
    private errorMessage: string;

    tblColabAdminList: TblColabAdmin[];

    msgs: Message[] = [];

    constructor(
        private configService: ConfigService) {
    }

    ngOnInit() {
        this.getConfig();
    }

    getConfig() {
        this.configService.getTblColabAdmin().subscribe(
            tblColabAdminList => this.tblColabAdminList = tblColabAdminList,
            error => this.errorMessage = <any>error
        );
    }

    selectAdmin(tblColabAdmin: TblColabAdmin) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabAdmin.snomatrcompl, detail: (tblColabAdmin.nflativo ? 'Ativo' : 'Inativo') });
        this.save(tblColabAdmin);
    }

    save(tblColabAdmin: TblColabAdmin) {
        this.configService
            .put(tblColabAdmin)
            .subscribe();
    }
}