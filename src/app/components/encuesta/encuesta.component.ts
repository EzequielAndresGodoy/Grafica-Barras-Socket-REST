import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public barChartType: ChartType = 'bar';
  // public barChartOptions: ChartConfiguration['options'] = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: {
  //     x: {},
  //     y: {
  //       min: 10
  //     }
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //     }
  //   }
  // };
  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' }
    ]
  };
  
  constructor(
    private http: HttpClient,
    public wsService: WebsocketService
    ) { }

  ngOnInit(): void {

    this.getData();
    this.escucharSocket()
  }

  getData() {
    this.http.get('http://localhost:5000/grafica').subscribe((data:any)=>this.barChartData = data)
  }

  escucharSocket() {
    this.wsService.listen('cambio-grafica').subscribe((data:any)=>{
      console.log('Sockcet',data)
      this.barChartData = data
    })
  }

}
