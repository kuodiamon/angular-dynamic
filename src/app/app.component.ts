import { Component, OnInit } from '@angular/core';
import { AdItem } from './class/ad-item';
import { AdService } from './service/ad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ads: AdItem[] = [];
  constructor(private adService: AdService) {}

  ngOnInit() {
    this.ads = this.adService.getAds();//利用service取得廣告
  }
}
