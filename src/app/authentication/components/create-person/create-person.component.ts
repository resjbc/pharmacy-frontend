import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppURL } from '../../../app.url';
import { AuthURL } from '../../authentication.url';
import { PersonService } from '../../services/person.service';
import { AlertService } from '../../../shareds/services/alert.service';
import { IPerson } from './person.interface';

export interface UserData {
  id: string;
  firstname: string;
  lastname: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/**
 * @title Data table with sorting, pagination, and filtering.
 */


@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {

  displayedColumns: string[] = ['cid', 'firstname', 'lastname', 'mobile', 'edit', 'delete'];
  dataSource: MatTableDataSource<IPerson>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  AppURL = AppURL;
  AuthURL = AuthURL;

  constructor(
    private personService: PersonService,
    private alert: AlertService
  ) {
    /*// Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));*/

    // Assign the data to the data source for the table to render

  }

  ngOnInit() {
    this.loadPersons();
  }

  loadPersons() {
    this.personService.getPersons().then(person => {
      this.dataSource = new MatTableDataSource(person);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
      .catch(err => this.alert.notify(err.Message));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(person) {
    console.log(person);
  }

  onDelete(person) {
    this.alert.confirm("ต้องการลบใช่หรือไม่")
      .then(status => {
        if (status)
          this.personService.removePerson(person)
            .then(() => {
              this.loadPersons();
            }).catch(err => this.alert.notify(err.Message));
      })
  }

  /*getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }*/
}

/** Builds and returns a new User. 
function createNewUser(id: number): UserData {
  const firstname =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    firstname: firstname,
    lastname: firstname + "ss",
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };

}*/


