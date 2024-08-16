import React, { Fragment } from 'react';

interface GenericListProps<T> {
    items: T[];
    getKey: (item: T) => React.Key;
    renderItem: (item: T) => React.ReactNode;
}

const GenericList = <T extends {}>({ items, renderItem, getKey }: GenericListProps<T>) => {
    return (
        <ul>
            {items.map((item, _) => (
                <Fragment key={getKey(item)}>{renderItem(item)}</Fragment>
            ))}
        </ul>
    );
};

export default GenericList;
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
];

const UserList = () => {
    return (
        <GenericList<{ id: number, name: string, age?: number }>
            items={users}
            getKey={user => user.id}
            renderItem={user => <li key={user.id}>{user.name}</li>}
        />
    );
};