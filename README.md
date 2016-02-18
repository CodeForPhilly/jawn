# dat jawn: 'Git for Tabular Data'

Jawn is a node.js module that allows _distributed version control of Tabular Data_. It's connected to the [dat](https://github.com/maxogden/dat) project. 

Jawn allows you to import tabular data (rows and columns like CSV or TSV) and track how those data change over time. It uses [hypercore](https://github.com/mafintosh/hypercore) to put those data into block chains that can be efficiently synced and validated across any number of hosts.  

The key features for jawn are to:
  * **manage and track change history** in tabular data
  * **create historical checkpoints** with metadata (e.g., message, timestamp, author)

Jawn relies on [hypercore](https://github.com/mafintosh/hypercore) to handle the core functions around creating merkle chains, which allows us to 

  * **supply access points to data** across the network with a peer-to-peer model
  * **sync incrementally** between machines

This is where jawn connects with the current work of the dat team, who created hypercore and are using it to do the same things with directories of files. For more background info, read our [Technical Background and Reference Code Bases](https://github.com/CfABrigadePhiladelphia/jawn/wiki/Technical-Background-and-Reference-Code-Bases) wiki page.

## Project Team

jawn is maintained by a [Code for Philly](https://codeforphilly.org) project that aims to be a model for mentorship and collaborative learning. For full information about the project go to the [jawn project page](https://codeforphilly.org/projects/dat_tables)  

We welcome contributions from anyone.

## Usage

_work in progress_

## Contributing

_work in progress_