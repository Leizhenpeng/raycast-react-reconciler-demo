import Reconciler from 'react-reconciler';

const hostConfig = {
    now: Date.now,
    getRootHostContext: () => null,
    getChildHostContext: () => null,
    prepareForCommit: () => null,
    resetAfterCommit: () => null,
    createInstance: (type, props) => {
        const el = document.createElement(type);
        Object.keys(props).forEach(propName => {
            const propValue = props[propName];
            if (propName === 'onClick') {
                el.addEventListener('click', propValue);
            } else if (propName === 'children' && typeof propValue === 'string') {
                const textNode = document.createTextNode(propValue);
                el.appendChild(textNode);
            } else {
                el.setAttribute(propName, propValue);
            }
        });
        return el;
    },
    createTextInstance: text => document.createTextNode(text),
    appendInitialChild: (parent, child) => {
        parent.appendChild(child);
    },
    appendChild: (parent, child) => {
        parent.appendChild(child);
    },
    finalizeInitialChildren: () => false,
    prepareUpdate: () => true,
    shouldSetTextContent: () => false,
    supportsMutation: true,
    appendChildToContainer: (container, child) => {
        container.appendChild(child);
    },
    removeChildFromContainer: (container, child) => {
        container.removeChild(child);
    },
    commitUpdate: (instance, updatePayload, type, oldProps, newProps) => {
        Object.keys(newProps).forEach(propName => {
            const propValue = newProps[propName];
            if (propName === 'children' && typeof propValue === 'string') {
                instance.firstChild.nodeValue = propValue;
            } else {
                instance.setAttribute(propName, propValue);
            }
        });
    },
    commitTextUpdate: (textInstance, oldText, newText) => {
        textInstance.nodeValue = newText
        console.log('commitTextUpdate', textInstance, oldText, newText);
    },
    clearContainer: (container) => {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    },
    detachDeletedInstance: (instance) => {
        instance.remove();
    },
};

const MyReconciler = Reconciler(hostConfig);

export default MyReconciler;
