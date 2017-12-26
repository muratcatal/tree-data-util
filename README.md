# TREE DATA UTIL
----
This library help you search for a parent of your node, or get all parents of your node in a tree structure. It has zero-dependency.

# How to install
----
##### Using npm
---
```
$ npm i --save tree-data-util
```

##### Using yarn
---
```
 $ yarn add tree-data-util
```

##### Compiling source code
---
- Download src code from github
- Open your cli and type
```
$ npm run build
```
or 
```
$ yarn run build
```
- Get file in dist folder and referance it in your application
# How to use
----
#### With default configuration file
```javascript
import {findParent,findAllParents} from 'tree-data-util'

let data = [
  {
    "id": "5a42327d9d7b2555c54e94c1",
    "name": "Carney Livingston",
    "children": [
      {
        "id": "5a42327d6c3ec84516e9a01e",
        "name": "Francesca Rice",
        "children": [
          {
            "id": "5a42327df5419a1796e7b43e",
            "name": "Gladys Kramer"
          },
          {
            "id": "5a42327d4263c504d740360d",
            "name": "Kerry Pacheco"
          }
        ]
      },
      {
        "id": "5a42327d0f8a5a94c5ff93d2",
        "name": "Acosta Perez",
        "children": [
          {
            "id": "5a42327d1c907390edbae7d9",
            "name": "Mcfadden Sloan"
          }
        ]
      }
    ]
  }
]

let node = {
        "id": "5a42327d0f8a5a94c5ff93d2",
        "name": "Acosta Perez",
        "children": [
          {
            "id": "5a42327d1c907390edbae7d9",
            "name": "Mcfadden Sloan"
          }
        ]
};

const parent = findParent(data,node,(touchedNode,myNode) => item.id === myNode.id);
const parents = findAllParents(data,node,(touchedNode,myNode) => item.id === myNode.id);
```
#### With configuration file
To configure findParent or findAllParents function, send configuration parameter as last element. 
```javascript
let data = [
  {
    "id": "5a42375029d4c6f5578f851c",
    "name": "Lynnette Jefferson",
    "members": [
      {
        "id": "5a423750697fde154251384f",
        "name": "Phillips Lawrence",
        "members": [
          {
            "id": "5a4237509539a1f7b2eb7130",
            "name": "Roxie Sampson"
          }
        ]
      },
      {
        "id": "5a423750d66c2c134fa2ad20",
        "name": "Holland Gomez",
        "members": [
          {
            "id": "5a423750333570a106706791",
            "name": "Clarke Lewis"
          }
        ]
      }
    ]
  }
];

const config = {
    props: {
        children: "members"
    }
}
const parent = findParent(data,node,(touchedNode,myNode) => item.id === myNode.id,config);
const parents = findAllParents(data,node,(touchedNode,myNode) => item.id === myNode.id,config);
```
# OUTPUT
----
> findParent function return parent node in your tree data
```javascript
/* output example of findParent */
{
  "id": "5a42327d6c3ec84516e9a01e",
  "name": "Francesca Rice",
  "children": [
    {
      "id": "5a42327df5419a1796e7b43e",
      "name": "Gladys Kramer"
    },
    {
      "id": "5a42327d4263c504d740360d",
      "name": "Kerry Pacheco"
    }
  ]
}
```
---
> findAllParents function will return array of all parents starts from root to last parent which means zero index will have your root node
```javascript
/* output example of findAllParents */
[
  {
    "id": "5a42327d9d7b2555c54e94c1",
    "name": "Carney Livingston",
    "children": [
      {
        "id": "5a42327d6c3ec84516e9a01e",
        "name": "Francesca Rice",
        "children": [
          {
            "id": "5a42327df5419a1796e7b43e",
            "name": "Gladys Kramer"
          },
          {
            "id": "5a42327d4263c504d740360d",
            "name": "Kerry Pacheco"
          }
        ]
      },
      {
        "id": "5a42327d0f8a5a94c5ff93d2",
        "name": "Acosta Perez",
        "children": [
          {
            "id": "5a42327d1c907390edbae7d9",
            "name": "Mcfadden Sloan"
          }
        ]
      }
    ]
  },
  {
    "id": "5a42327d6c3ec84516e9a01e",
    "name": "Francesca Rice",
    "children": [
      {
        "id": "5a42327df5419a1796e7b43e",
        "name": "Gladys Kramer"
      },
      {
        "id": "5a42327d4263c504d740360d",
        "name": "Kerry Pacheco"
      }
    ]
  }
]
```
# Parameter Descriptions
----
> findParent and findAllParents functions get exactly the same parameters. The difference between them is just return types.

| Parameter 	|   Type   	| Required 	| Defaults                                	| Description                                                                                                                                                                                                                                                                                                                                                                                	|
|:---------:	|:--------:	|----------	|-----------------------------------------	|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| data      	|   array  	| yes      	| -                                       	| tree structured data in an array                                                                                                                                                                                                                                                                                                                                                           	|
| node      	|   json   	| yes      	| -                                       	| the node in json format you want to find parent                                                                                                                                                                                                                                                                                                                                            	|
| predicate 	| function 	| yes      	| -                                       	| function to find your node in data tree. that function will have two parameters. First parameter will be the touched node in tree and second parameter will be your searched node. ex: you want to find your node by id so that function will be like this;   (touchedNode, searchedNode) => touchedNode.id === searchedNode when this expression sets true it will return your parent 	|
| config    	|   json   	| no       	| {  props:{   children:'children'    } } 	| configuration parameter for children variables in your tree. you can configure your children variable name to be looked for in your tree by that configuration parameter. by default, functions will look for 'children' property in your tree model.                                                                                                                                      	|

# Change log
----
To access change log,[please click ](./CHANGELOG.md)
# Contributing
----
I'd be very happy if you feedback any issue