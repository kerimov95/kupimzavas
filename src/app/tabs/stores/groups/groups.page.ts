import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from './group.service';
import { Group, Stores } from 'src/app/models/stores';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  public loadStatus: boolean;
  public title: string;

  constructor(
    private util: UtilitiesService,
    private groupService: GroupService,
    private router: Router,

  ) { }

  ngOnInit() {
    let store = this.util.getValue<Stores>('store').value
    this.title = store.name;
    this.groupService.getGroups(store.id).subscribe();
  }

  public getGroup(): Group[] {
    return this.groupService.groupsArr.sort((a, b) => a.name.localeCompare(b.name));
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.loadStatus = true;
    }, 1000);
  }

  public get StatusLoad(): boolean {
    if (this.loadStatus && !this.util.statusLoad)
      return true;
    else
      return false;
  }

  public navigate(group: Group) {
    this.util.setValue<Group>({ key: 'group', value: group });
    this.router.navigate(['home/tabs/stores/groups/products'])
  }

}
