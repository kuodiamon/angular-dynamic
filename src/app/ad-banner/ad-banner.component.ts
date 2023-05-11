import { Component, Input, ViewChild } from '@angular/core';
import { AdItem } from '../class/ad-item';
import { AdDirective } from '../ad.directive';
import { AdComponent } from '../ad.component';
@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss'],
})

export class AdBannerComponent {
  @Input() ads: AdItem[] = [];
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;// 利用ViewChild取得對應的AdDirective
  currentAdIndex = -1;// adIndex
  private clearTimer: VoidFunction | undefined;/// 暫存clearTimer

  ngOnInit(): void {
    this.loadComponent();// 利用NgOnInit()啟動loadComponent()
    this.getAds();// 取得getAds()
  }

  ngOnDestroy() {
    this.clearTimer?.();// 清除clearTimer
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;// 取得adIndex
    const adItem = this.ads[this.currentAdIndex];// 取對應的adItem

    const viewContainerRef = this.adHost.viewContainerRef;// 取得viewContainerRef
    viewContainerRef.clear();// 把viewContainerRef中所有的component清除掉

    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);// 建立componentRef
    componentRef.instance.data = adItem.data;// 把adItem.data置入給componentRef.instance.data
  }

  getAds() {
    const interval = setInterval(() => {
      this.loadComponent();
    }, 3000);// 一個計時器，每過 3 秒就取得一次英雄廣告
    this.clearTimer = () => clearInterval(interval);// 清除interval
  }
}
