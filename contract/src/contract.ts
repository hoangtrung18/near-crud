// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from "near-sdk-js";
class Student {
  name: string;
  score: number;
  constructor(payload: any) {
    this.name = payload.name;
    this.score = payload.score;
  }
}
@NearBindgen({})
class NearCrud {
  students: Student[] = [];

  @view({}) // This method is read-only and can be called for free
  get_student(): Student[] {
    return this.students;
  }

  @call({}) // This method changes the state, for which it cost gas
  create_student(student: { name: string; score: number }): void {
    this.students.push(new Student(student));
  }
}
