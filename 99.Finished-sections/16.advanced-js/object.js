class Job {
  constructor(title, location, salary) {
    this.title = title;
    this.location = location;
    this.salary = salary;
  }

  describe() {
    console.log(
      `I'm a ${this.title}, I work in ${this.location} and I earn ${this.salary}`,
    );
  }
}

const job = new Job('Developer', 'Korea', '3000');
const job2 = new Job('Engineer', 'Korea', '7000');

job.describe();
job2.describe();
