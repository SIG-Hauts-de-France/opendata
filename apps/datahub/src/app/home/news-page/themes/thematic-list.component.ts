// thematic-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FieldsService } from '@geonetwork-ui/feature/search';

@Component({
  selector: 'datahub-thematic-list',
  templateUrl: './thematic-list.component.html',
  styleUrls: ['./thematic-list.component.css']
})
export class ThematicListComponent implements OnInit {
  themes: {
    name: string;
    label: string;
    datasetCount: number;
  }[] = [];

  ngOnInit() {
    this.getTopicsWithDatasetCount();
  }

  constructor(
    private router: Router,
    private fieldsService: FieldsService
  ) {}

  navigateToSearch(topic: string): void {
    this.router.navigate(['/search'], { queryParams: { topic: topic } });
  }

  getTopicsWithDatasetCount(): void {
    const thematicField = 'topic';
  
    this.fieldsService.getAvailableValues(thematicField).subscribe(themesAvailable => {
      for (const theme of themesAvailable) {
        const match = theme.label.match(/\((\d+)\)/);
        const datasetCount = match ? parseInt(match[1], 10) : 0;
        const name = theme.value.toString();
        const label = theme.label.replace(/\s*\(\d+\)\s*/, '');
  
        this.themes.push({
          name: name,
          label: label.trim() || 'Pas de thématique',
          datasetCount: datasetCount
        });
      }
    });
  }

  getIconContent(themeName: string): string {
    switch (themeName) {
      case 'biota':
        return '&#xe935;';
      case 'planningCadastre':
        return '&#xe92c;';
      case 'imageryBaseMapsEarthCover':
        return '&#xe929;';
      case 'economy':
        return '&#xe922;';
      case 'environment':
        return '&#xe932;';
      case 'transportation':
        return '&#xe93e;';
      case 'boundaries':
        return '&#xe92a;';
      case 'society':
        return '&#xe964;';
      case 'utilitiesCommunication':
        return '&#xe904;';
      case 'health':
        return '&#xe951;';
      default:
        return '&#xe985;';
    }
  }

}