import { findParent, findAllParents, getItem, setItem } from '../src/index';
import dataWithChildren from './data-with-children';
import dataWithMembers from './data-with-members';

let expect = require('chai').expect

describe('Tree Data Utils', function () {
    describe("#finding-parent-of-a-node", function () {

        describe("#with-default-configuration", function () {
            let searchId = '5a420413e5ddb296f906fcc2',
                expectedParentId = '5a420413a0499d9afec996f2';
            it(`${searchId} id must have parent with ${expectedParentId} id`, function () {
                testFindParent(dataWithChildren, searchId, expectedParentId);
            });
        });

        describe("#with-children-configuration", function () {
            let searchId = '5a4221b22d5a530a827666b2',
                expectedParentId = '5a4221b215d18da5383eb98d';
            it(`${searchId} id must have parent with ${expectedParentId} id`, function () {
                testFindParent(dataWithMembers, searchId, expectedParentId, {
                    props: {
                        children: "members"
                    }
                });
            });
        });
    });

    describe("#finding-item-of-a-tree", function () {
        describe("#with-default-configuration", function () {
            let searchId = '5a420413b9f7cf39d817a065',
                expectedId = '5a420413b9f7cf39d817a065';
            it(`${searchId} id must have item with ${expectedId} id`, function () {
                testGetItem(dataWithChildren, searchId, expectedId);
            });
        });
    });

    describe("#setting-item-of-a-tree", function () {
        describe("#with-default-configuration", function () {
            let searchId = '5a4204133f4351dbe7bd99d6';
            let newNode = {
                id: searchId,
                name: 'istanbul'
            };
            it(`${searchId} name must have item with name ${newNode.name}`, function () {
                testSetItem(dataWithChildren, newNode, searchId);
            });
        });
    });

    describe("#finding-all-parents-of-a-node", function () {

        describe("#with-default-configuration", function () {
            let searchId = '5a420413e5ddb296f906fcc2',
                expectedParents = ["5a420413f5cedabb270ed99b", "5a420413f8239c3fd1400a07", "5a420413a0499d9afec996f2"];
            it(`id of ${searchId} must have parents with id ${expectedParents}`, function () {
                testFindAllParents(dataWithChildren, searchId, expectedParents);
            });
        });

        describe("#with-children-configuration", function () {
            let searchId = '5a4221b22d5a530a827666b2',
                expectedParents = ["5a4221b2694a71a24a922f69", "5a4221b2d4b83eab22bef405", "5a4221b215d18da5383eb98d"];
            it(`id of ${searchId} must have parents with id ${expectedParents}`, function () {
                testFindAllParents(dataWithMembers, searchId, expectedParents, {
                    props: {
                        children: "members"
                    }
                });
            });
        });

    });
});

const testFindParent = (data, searchId, expectedParentId, config = {}) => {
    let node = {
        id: searchId
    }
    let parent = findParent(data, node, (item, node) => {
        return item.id === node.id
    }, config);

    expect(parent)
        .to
        .have
        .property('id', expectedParentId);
}

const testGetItem = (data, searchId, expectedId, config = {}) => {
    let node = {
        id: searchId
    }
    let item = getItem(data, node, (item, node) => {
        return item.id === node.id
    }, config);

    expect(item)
        .to
        .have
        .property('id', expectedId);
}

const testSetItem = (data, newNode, searchId, config = {}) => {
    let node = {
        id: searchId
    }
    let item = setItem(data, node, newNode, (item, node) => {
        return item.id === node.id
    }, config);

    expect(item)
        .to
        .have
        .property('name', newNode.name);
}

const testFindAllParents = (data, searchId, parents, config = {}) => {
    let node = {
        id: searchId
    }
    let result = findAllParents(data, node, (item, node) => {
        return item.id === node.id
    }, config);

    result = result.map((item) => item.id);

    expect(parents)
        .to
        .have
        .members(result);
}