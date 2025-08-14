import fs from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const DATA_PATH = './data/data.json';

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  } catch (err) {
    return [];
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

yargs(hideBin(process.argv))
  .command({
    command: 'add',
    describe: 'Add new data',
    builder: {
      name: { 
            describe: 'Name',
            demandOption: true,
            type: 'string' },
      mobile: {
            describe: 'Mobile',
            demandOption: true,
            type: 'string' },
      email: {
            describe: 'Email',
            demandOption: false,
            type: 'string' },
    },
    handler(argv) {
      const contacts = loadData();
      contacts.push({ name: argv.name, mobile: argv.mobile, email: argv.email });
      saveData(contacts);
      console.log('Data saved');
    }
  })

  .command({
    command: 'list',
    describe: 'List all contacts',
    handler() {
      const contacts = loadData();
      console.table(contacts);
    }
  })

  .command({
    command: 'detail',
    describe: 'Show contact detail',
    builder: {
      name: { 
        describe: 'Name',
        demandOption: true,
        type: 'string' }
    },
    handler(argv) {
      const contacts = loadData();
      const contact = contacts.find(c => c.name === argv.name);
      if (contact) console.log(contact);
      else console.log('Contact not found');
    }
  })

  .command({
    command: 'update',
    describe: 'Update a contact',
    builder: {
      name: { 
        describe: 'Name to update',
        demandOption: true,
        type: 'string' },
      mobile: { 
        describe: 'New mobile',
        demandOption: false,
        type: 'string' },
      email: { 
        describe: 'New email',
        type: 'string' },
    },
    handler(argv) {
      const contacts = loadData();
      const index = contacts.findIndex(c => c.name === argv.name);
      if (index === -1) return console.log('Contact data not found');

      if (argv.mobile) contacts[index].mobile = argv.mobile;
      if (argv.email) contacts[index].email = argv.email;

      saveData(contacts);
      console.log('Contact data updated');
    }
  })

  .command({
    command: 'delete',
    describe: 'Delete a contact',
    builder: {
      name: { 
        describe: 'Name to delete',
        demandOption: true,
        type: 'string' }
    },
    handler(argv) {
      const contacts = loadData();
      const newContacts = contacts.filter(c => c.name !== argv.name);
      if (newContacts.length === contacts.length) return console.log('Data not found');

      saveData(newContacts);
      console.log('Data deleted');
    }
  })

  .demandCommand(1)
  .parse();
