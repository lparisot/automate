import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Network } from 'vis';

@Component({
  selector: 'app-network-graph',
  templateUrl: './network-graph.component.html',
  styleUrls: ['./network-graph.component.css']
})
export class NetworkGraphComponent implements OnInit, OnChanges {
  width: number;
  height: number;
  options: any;
  network: Network;
  id: number;

  @Input('data') data: any;

  constructor() {
    this.width = 640;
    this.height = 640;
    this.options = {
      edges: {
        arrows: {
          to: { enabled: true, scaleFactor: 1 }
        },
        color: 'gray',
        smooth: true
      },
      interaction: {
        dragNodes: true,
        dragView: false,
        zoomView: true
      },
      manipulation: {
        enabled: false,
        addNode: false,
        deleteNode: false,
        addEdge: false
      },
      physics: true
    };
    this.options.width = this.width + 'px';
    this.options.height = this.height + 'px';
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.id = 0;
    const container = document.getElementById('visualization');
    const data = this.getData(this.data);

    this.network = new Network(container, data, this.options);
  }

  getData(data) {
    let nodes = [];
    let edges = [];
    this.generate(nodes, edges, data.transitions);

    return { nodes: nodes, edges: edges };
  }

  makeNode(id, name: string, role: string) {
    role = role.toLowerCase();
    return { id: id, label: name };
  }

  makeEdge(from, to, label) {
    let width, length;
    if (!label) {
      label = '';
      width = 1;
      length = 80;
    } else {
      width = 3;
      length = 300;
    }
    return { from: from, to: to, label: label, width: width, length: length };
  }

  newId(): number {
    return this.id++;
  }

  findNode(nodes, name: string) {
    return nodes.find((node) => node.label === name);
  }

  generateNode(nodes, label) {
    let node = this.findNode(nodes, label);
    if (!node) {
      node = this.makeNode(this.newId(), label, '');
      nodes.push(node);
    }
    return node;
  }
  generateFrom(nodes, transition) {
    return this.generateNode(nodes, transition);
  }
  generateTo(nodes, transition) {
    if (typeof transition === 'string') {
      return [this.generateNode(nodes, transition)];
    } else {
      let retArray = [];
      transition.forEach((transition) => {
        retArray.push(this.generateNode(nodes, transition));
      })
      return retArray;
    }
  }

  generate(nodes, edges, transitions) {
    transitions.map((transition, index) => {
      const nodeFrom = this.generateFrom(nodes, transition.from);
      const nodesTo = this.generateTo(nodes, transition.to);
      nodesTo.forEach((nodeTo) => {
        edges.push(this.makeEdge(nodeFrom.id, nodeTo.id, transition.name));
      });
    });
  }
}
