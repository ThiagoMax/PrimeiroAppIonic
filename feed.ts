import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
       MoovieProvider
  ]
})
export class FeedPage {

  public objeto_feed = {
    titulo: "Thiago Maxx",
    data: "November 5, 1955",
    descricao: "Aqui estou mais um dia...",
    qntd_likes: 12,
    qntd_comments: 4,
    time_comment: "11h ago"
  }

  public lista_filmes = new Array<any>();
  public page = 1;

  public nome_usuario:string = "Thiago Max";
  public loader;
  public refresher;
  public isRefreshing: boolean = false;
  public infiniteScroll

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private moovieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }

  abreCarregando() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes...",
    });
    this.loader.present();
  }

  fechaCarregando() {
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;

    this.carregarFilmes();
  }
  
  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    console.log(filme);
    this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregarFilmes(true);
  }

  carregarFilmes(newpage: boolean = false) {
    this.abreCarregando();
    this.moovieProvider.getLatestMovies(this.page).subscribe(
      data=>{
        const response = (data as any);
        const objeto_retorno = JSON.parse(response._body);

        if(newpage) {
          this.lista_filmes = this.lista_filmes.concat(objeto_retorno.results);
          this.infiniteScroll.complete();
        }
        else {
          this.lista_filmes = objeto_retorno.results;
        }

        this.fechaCarregando();

        if(this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, erro=>{
        console.log(erro);
        this.fechaCarregando();

        if(this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }
    )
  }

}
