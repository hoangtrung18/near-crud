// Find all our documentation at https://docs.near.org
import { NearBindgen, near, call, view } from "near-sdk-js";
class Student {
  name: string;
  score: number;
  index: number;
  constructor(payload: any) {
    this.name = payload.name;
    this.score = payload.score;
    this.index = payload.index;
  }
}
@NearBindgen({})
class NearCrud {
  students: Student[] = [];
  index: number = 1;

  @view({}) // This method is read-only and can be called for free
  get_student(): Student[] {
    return this.students;
  }

  @call({}) // This method changes the state, for which it cost gas
  create_student({ name, score }: { name: string; score: number }): void {
    this.students.push(new Student({ name, score, index: this.index }));
    this.index += 1;
  }

  @call({}) // This method changes the state, for which it cost gas
  remove_student({ index }: { index: number }): void {
    if (this.students.length > index) {
      this.students = this.students.filter(
        (student) => student.index !== index
      );
    }
  }

  @call({}) // This method changes the state, for which it cost gas
  update_student({ index, update }: { index: number; update: Student }): void {
    this.students = this.students.map((s) => {
      if (s.index == index) {
        return new Student(update);
      }
      return s;
    });
  }
}
