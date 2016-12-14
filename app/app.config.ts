import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { ConfigService } from './config/configService';
import { TblColabAdmin } from './config/TblColabAdmin';
import { TblColabCargo } from './config/TblColabCargo';
import { TblColabCidade } from './config/TblColabCidade';
import { TblColabEstado } from './config/TblColabEstado';
import { TblColabGrupo } from './config/TblColabGrupo';
import { TblColabSituacao } from './config/TblColabSituacao';
import { TblColabEntreGrupo } from './config/TblColabEntreGrupo';
import { Message, SelectItem } from 'primeng/primeng';

@Component({
    templateUrl: 'app/app.config.html',
    selector: 'config-app',
    providers: [ConfigService]
})
export class AppConfig implements OnInit {
    private errorMessage: string;

    tblColabAdminList: TblColabAdmin[];
    tblColabCargoList: TblColabCargo[];
    tblColabCidadeList: TblColabCidade[];
    tblColabEntreGrupoList: TblColabEntreGrupo[];
    tblColabEstadoList: TblColabEstado[];
    tblColabGrupoList: TblColabGrupo[];
    tblColabSituacaoList: TblColabSituacao[];

    msgs: Message[] = [];

    displayAdmin: boolean = false;
    displayCargo: boolean = false;
    displayCidade: boolean = false;
    displayEntreGrupo: boolean = false;
    displayEstado: boolean = false;
    displayGrupo: boolean = false;
    displaySituacao: boolean = false;

    adminForm: FormGroup;
    cargoForm: FormGroup;
    cidadeForm: FormGroup;
    entreGrupoForm: FormGroup;
    estadoForm: FormGroup;
    grupoForm: FormGroup;
    situacaoForm: FormGroup;

    submitted: boolean;

    matrCompl: string;
    cargo: string;
    cidade: string;
    estado: string;
    entreGrupo: string;
    grupo: string;
    situacao: string;
    tela: string;
    data: string;
    dtDesligArea: string;
    dtDesligEmpresa: string;
    dtAso: string;

    selectedEstado: string;
    selectedGrupo: string;

    estados: SelectItem[] = [];
    grupos: SelectItem[] = [];

    upperMatrCompl() {
        this.matrCompl = this.matrCompl.toUpperCase();
    }

    upperEstado() {
        this.estado = this.estado.toUpperCase();
    }

    showDialogAdmin() {
        this.displayAdmin = true;
        this.matrCompl = null;
    }

    showDialogCargo() {
        this.displayCargo = true;
        this.cargo = null;
    }

    showDialogCidade() {
        this.displayCidade = true;
        this.cidade = null;
        this.selectedEstado = '';
    }

    showDialogEntreGrupo() {
        this.displayEntreGrupo = true;
        this.entreGrupo = null;
        this.selectedGrupo = '';
    }

    showDialogEstado() {
        this.displayEstado = true;
        this.estado = null;
    }

    showDialogGrupo() {
        this.displayGrupo = true;
        this.grupo = null;
    }

    showSituacao() {
        this.displaySituacao = true;
        this.situacao = null;
        this.tela = null;
        this.data = null;
        this.dtDesligArea = null;
        this.dtDesligEmpresa = null;
        this.dtAso = null;
    }

    removeScroll(e) {
        document.getElementById('body').style.overflow = 'hidden';
    }

    addScroll(e) {
        document.getElementById('body').style.overflow = 'scroll';
    }

    constructor(
        private configService: ConfigService, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.getConfig();
        this.validation();
    }

    onSubmitAdmin(value: string) {
        let tblColabAdmin: TblColabAdmin = new TblColabAdmin();
        tblColabAdmin.nflativo = 1;
        tblColabAdmin.ativo = true;
        tblColabAdmin.snomatrcompl = value["matriculaInputMask"];
        this.tblColabAdminList.push(tblColabAdmin);
        this.tblColabAdminList.sort((a, b) => a.snomatrcompl.localeCompare(b.snomatrcompl));
        this.addAdmin(tblColabAdmin);

        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabAdmin.snomatrcompl, detail: 'Criado com sucesso' });

        this.displayAdmin = false;
    }

    onSubmitCargo(value: string) {
        let tblColabCargo: TblColabCargo = new TblColabCargo();
        tblColabCargo.nflativo = 1;
        tblColabCargo.ativo = true;
        tblColabCargo.sdccargo = value["cargoInput"];
        tblColabCargo.sdccargo = tblColabCargo.sdccargo.toUpperCase();
        this.configService.getTblColabCargoMax().subscribe(
            tblColabCargoMax => {
                tblColabCargo.idcargo = tblColabCargoMax + 1;
                this.tblColabCargoList.push(tblColabCargo);
                this.tblColabCargoList.sort((a, b) => a.sdccargo.localeCompare(b.sdccargo));
                this.addCargo(tblColabCargo);
            },
            error => this.errorMessage = <any>error,
        );
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabCargo.sdccargo, detail: 'Criado com sucesso' });

        this.displayCargo = false;
    }

    onSubmitEstado(value: string) {
        let tblColabEstado: TblColabEstado = new TblColabEstado();
        tblColabEstado.nflativo = 1;
        tblColabEstado.ativo = true;
        tblColabEstado.sdcestado = value["estadoInput"];
        tblColabEstado.sdcestado = tblColabEstado.sdcestado.toUpperCase();
        this.configService.getTblColabEstadoMax().subscribe(
            tblColabEstadoMax => {
                tblColabEstado.idestado = tblColabEstadoMax + 1;
                this.tblColabEstadoList.push(tblColabEstado);
                this.tblColabEstadoList.sort((a, b) => a.sdcestado.localeCompare(b.sdcestado));
                this.addEstado(tblColabEstado);
                this.estados.push({ label: tblColabEstado.sdcestado, value: tblColabEstado.idestado });
                this.estados.sort((a, b) => a.label.localeCompare(b.label));
            },
            error => this.errorMessage = <any>error,
        );
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabEstado.sdcestado, detail: 'Criado com sucesso' });

        this.displayEstado = false;
    }

    onSubmitGrupo(value: string) {
        let tblColabGrupo: TblColabGrupo = new TblColabGrupo();
        tblColabGrupo.nflativo = 1;
        tblColabGrupo.ativo = true;
        tblColabGrupo.sdcgrupo = value["grupoInput"];
        tblColabGrupo.sdcgrupo = tblColabGrupo.sdcgrupo.toUpperCase();
        this.configService.getTblColabGrupoMax().subscribe(
            tblColabGrupoMax => {
                tblColabGrupo.idgrupo = tblColabGrupoMax + 1;
                this.tblColabGrupoList.push(tblColabGrupo);
                this.tblColabGrupoList.sort((a, b) => a.sdcgrupo.localeCompare(b.sdcgrupo));
                this.addGrupo(tblColabGrupo);
            },
            error => this.errorMessage = <any>error,
        );
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabGrupo.sdcgrupo, detail: 'Criado com sucesso' });

        this.displayGrupo = false;
    }

    onSubmitCidade(value: string) {
        let tblColabEstado: TblColabEstado = new TblColabEstado();
        let index = value["estadoInput"] - 1;
        tblColabEstado = this.tblColabEstadoList[index];

        let tblColabCidade: TblColabCidade = new TblColabCidade();
        tblColabCidade.tblColabEstado = tblColabEstado;
        tblColabCidade.nflativo = 1;
        tblColabCidade.ativo = true;
        tblColabCidade.sdccidade = value["cidadeInput"];
        tblColabCidade.sdccidade = tblColabCidade.sdccidade.toUpperCase();
        this.configService.getTblColabCidadeMax().subscribe(
            tblColabCidadeMax => {
                tblColabCidade.idcidade = tblColabCidadeMax + 1;
                this.tblColabCidadeList.push(tblColabCidade);
                this.tblColabCidadeList.sort((a, b) => a.sdccidade.localeCompare(b.sdccidade));
                this.addCidade(tblColabCidade);
            },
            error => this.errorMessage = <any>error,
        );
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabCidade.sdccidade, detail: 'Criado com sucesso' });

        this.displayCidade = false;
        document.getElementById('body').style.overflow = 'scroll';
    }

    onSubmitEntreGrupo(value: string) {
        let tblColabGrupo: TblColabGrupo = new TblColabGrupo();
        let index = value["grupoInput"] - 1;
        tblColabGrupo = this.tblColabGrupoList[index];

        let tblColabEntreGrupo: TblColabEntreGrupo = new TblColabEntreGrupo();
        tblColabEntreGrupo.tblColabGrupo = tblColabGrupo;
        tblColabEntreGrupo.nflativo = 1;
        tblColabEntreGrupo.ativo = true;
        tblColabEntreGrupo.sdcentregrupo = value["entreGrupoInput"];
        tblColabEntreGrupo.sdcentregrupo = tblColabEntreGrupo.sdcentregrupo.toUpperCase();
        this.configService.getTblColabEntreGrupoMax().subscribe(
            tblColabEntreGrupoMax => {
                tblColabEntreGrupo.identregrupo = tblColabEntreGrupoMax + 1;
                this.tblColabEntreGrupoList.push(tblColabEntreGrupo);
                this.tblColabEntreGrupoList.sort((a, b) => (a.tblColabGrupo.sdcgrupo + "|" + a.sdcentregrupo).localeCompare(b.tblColabGrupo.sdcgrupo + "|" + b.sdcentregrupo));
                this.addEntreGrupo(tblColabEntreGrupo);
            },
            error => this.errorMessage = <any>error,
        );
        this.submitted = true;
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabEntreGrupo.sdcentregrupo, detail: 'Criado com sucesso' });

        this.displayEntreGrupo = false;
        document.getElementById('body').style.overflow = 'scroll';
    }

    getConfig() {
        this.configService.getTblColabAdmin().subscribe(
            tblColabAdminList => this.tblColabAdminList = tblColabAdminList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.tblColabAdminList) {
                    entry.ativo = entry.nflativo == 1;
                }
            }
        );
        this.configService.getTblColabCargo().subscribe(
            tblColabCargoList => this.tblColabCargoList = tblColabCargoList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.tblColabCargoList) {
                    entry.ativo = entry.nflativo == 1;
                }
            }
        );
        this.configService.getTblColabCidade().subscribe(
            tblColabCidadeList => this.tblColabCidadeList = tblColabCidadeList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.tblColabCidadeList) {
                    entry.ativo = entry.nflativo == 1;
                }
            }
        );
        this.configService.getTblColabEstado().subscribe(
            tblColabEstadoList => this.tblColabEstadoList = tblColabEstadoList,
            error => this.errorMessage = <any>error,
            () => {
                this.estados.push({ label: '', value: '' });
                let i: number = 1;
                for (let entry of this.tblColabEstadoList) {
                    entry.ativo = entry.nflativo == 1;
                    this.estados.push({ label: entry.sdcestado, value: i });
                    i++;
                }
            }
        );
        this.configService.getTblColabGrupo().subscribe(
            tblColabGrupoList => this.tblColabGrupoList = tblColabGrupoList,
            error => this.errorMessage = <any>error,
            () => {
                this.grupos.push({ label: '', value: '' });
                let i: number = 1;
                for (let entry of this.tblColabGrupoList) {
                    entry.ativo = entry.nflativo == 1;
                    this.grupos.push({ label: entry.sdcgrupo, value: i });
                    i++;
                }
            }
        );
        this.configService.getTblColabSituacao().subscribe(
            tblColabSituacaoList => this.tblColabSituacaoList = tblColabSituacaoList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.tblColabSituacaoList) {
                    entry.ativo = entry.nflativo == 1;
                }
            }
        );
        this.configService.getTblColabEntreGrupo().subscribe(
            tblColabEntreGrupoList => this.tblColabEntreGrupoList = tblColabEntreGrupoList,
            error => this.errorMessage = <any>error,
            () => {
                for (let entry of this.tblColabEntreGrupoList) {
                    entry.ativo = entry.nflativo == 1;
                }
            }
        );
    }

    validation() {
        this.adminForm = this.fb.group({
            'matriculaInputMask': new FormControl('', [Validators.required])
        });
        this.cargoForm = this.fb.group({
            'cargoInput': new FormControl('', [Validators.required])
        });
        this.cidadeForm = this.fb.group({
            'cidadeInput': new FormControl('', [Validators.required]),
            'estadoInput': new FormControl('', [Validators.required])
        });
        this.estadoForm = this.fb.group({
            'estadoInput': new FormControl('', [Validators.required])
        });
        this.entreGrupoForm = this.fb.group({
            'entreGrupoInput': new FormControl('', [Validators.required]),
            'grupoInput': new FormControl('', [Validators.required])
        });
        this.grupoForm = this.fb.group({
            'grupoInput': new FormControl('', [Validators.required])
        });
        this.situacaoForm = this.fb.group({
            'situacaoInput': new FormControl('', [Validators.required])
        });
    }

    selectAdmin(tblColabAdmin: TblColabAdmin) {
        tblColabAdmin.nflativo = tblColabAdmin.ativo ? 1 : 0;
        this.saveAdmin(tblColabAdmin);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabAdmin.snomatrcompl, detail: (tblColabAdmin.ativo ? 'Ativo' : 'Inativo') });
    }

    selectCargo(tblColabCargo: TblColabCargo) {
        tblColabCargo.nflativo = tblColabCargo.ativo ? 1 : 0;
        this.saveCargo(tblColabCargo);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabCargo.sdccargo, detail: (tblColabCargo.ativo ? 'Ativo' : 'Inativo') });
    }

    selectCidade(tblColabCidade: TblColabCidade) {
        tblColabCidade.nflativo = tblColabCidade.ativo ? 1 : 0;
        this.saveCidade(tblColabCidade);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabCidade.sdccidade, detail: (tblColabCidade.ativo ? 'Ativo' : 'Inativo') });
    }

    selectEstado(tblColabEstado: TblColabEstado) {
        tblColabEstado.nflativo = tblColabEstado.ativo ? 1 : 0;
        this.saveEstado(tblColabEstado);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabEstado.sdcestado, detail: (tblColabEstado.ativo ? 'Ativo' : 'Inativo') });
    }

    selectGrupo(tblColabGrupo: TblColabGrupo) {
        tblColabGrupo.nflativo = tblColabGrupo.ativo ? 1 : 0;
        this.saveGrupo(tblColabGrupo);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabGrupo.sdcgrupo, detail: (tblColabGrupo.ativo ? 'Ativo' : 'Inativo') });
    }

    selectSituacao(tblColabSituacao: TblColabSituacao) {
        tblColabSituacao.nflativo = tblColabSituacao.ativo ? 1 : 0;
        this.saveSituacao(tblColabSituacao);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabSituacao.sdcsituacao, detail: (tblColabSituacao.ativo ? 'Ativo' : 'Inativo') });
    }

    selectEntreGrupo(tblColabEntreGrupo: TblColabEntreGrupo) {
        tblColabEntreGrupo.nflativo = tblColabEntreGrupo.ativo ? 1 : 0;
        this.saveEntreGrupo(tblColabEntreGrupo);

        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: tblColabEntreGrupo.sdcentregrupo, detail: (tblColabEntreGrupo.ativo ? 'Ativo' : 'Inativo') });
    }

    saveAdmin(tblColabAdmin: TblColabAdmin) {
        this.configService
            .putAdmin(tblColabAdmin)
            .subscribe();
    }

    saveCargo(tblColabCargo: TblColabCargo) {
        this.configService
            .putCargo(tblColabCargo)
            .subscribe();
    }

    saveCidade(tblColabCidade: TblColabCidade) {
        this.configService
            .putCidade(tblColabCidade)
            .subscribe();
    }

    saveEstado(tblColabEstado: TblColabEstado) {
        this.configService
            .putEstado(tblColabEstado)
            .subscribe();
    }

    saveGrupo(tblColabGrupo: TblColabGrupo) {
        this.configService
            .putGrupo(tblColabGrupo)
            .subscribe();
    }

    saveSituacao(tblColabSituacao: TblColabSituacao) {
        this.configService
            .putSituacao(tblColabSituacao)
            .subscribe();
    }

    saveEntreGrupo(tblColabEntreGrupo: TblColabEntreGrupo) {
        this.configService
            .putEntreGrupo(tblColabEntreGrupo)
            .subscribe();
    }

    addAdmin(tblColabAdmin: TblColabAdmin) {
        this.configService
            .postAdmin(tblColabAdmin)
            .subscribe();
    }

    addCargo(tblColabCargo: TblColabCargo) {
        this.configService
            .postCargo(tblColabCargo)
            .subscribe();
    }

    addCidade(tblColabCidade: TblColabCidade) {
        this.configService
            .postCidade(tblColabCidade)
            .subscribe();
    }

    addEstado(tblColabEstado: TblColabEstado) {
        this.configService
            .postEstado(tblColabEstado)
            .subscribe();
    }

    addEntreGrupo(tblColabEntreGrupo: TblColabEntreGrupo) {
        this.configService
            .postEntreGrupo(tblColabEntreGrupo)
            .subscribe();
    }

    addGrupo(tblColabGrupo: TblColabGrupo) {
        this.configService
            .postGrupo(tblColabGrupo)
            .subscribe();
    }

    addSituacao(tblColabSituacao: TblColabSituacao) {
        this.configService
            .postSituacao(tblColabSituacao)
            .subscribe();
    }
}