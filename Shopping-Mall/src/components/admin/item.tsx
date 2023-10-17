import moment from 'moment';
import {
    IconButton,
    ProdcutItemText,
    ProductItemColumn,
    ProductItemContainer,
    ProductItemImage,
    ProductItemTextContainer,
    ProductItemTextType,
} from '../../styles/styles';
import { Product } from '../../types/types';
import { faPencil, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { QueryKeys, getClient, graphqlFetcher } from '../../utils/queryClient';
import { UPDATE_PRODUCT } from '../../graphql/products';
import { DELETE_PRODUCT } from '../../graphql/products';

export default function AdminItem({ id, title, price, imageUrl, createdAt }: Product) {
    const queryClient = getClient();
    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [newPrice, setNewPrice] = useState(price);

    const { mutate: updateProduct } = useMutation(
        ({ id, title, price }: { id: string; title: string; price: number }) => graphqlFetcher(UPDATE_PRODUCT, { id, title, price }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
                    exact: false,
                    refetchInactive: false,
                });
            },
        },
    );

    const { mutate: deleteProduct } = useMutation(({ id }: { id: string }) => graphqlFetcher(DELETE_PRODUCT, { id }), {
        onSuccess: () => {
            queryClient.invalidateQueries(QueryKeys.PRODUCTS, {
                exact: false,
                refetchInactive: false,
            });
        },
    });

    function handleEdit() {
        if (editing) {
            updateProduct({ id, title: newTitle, price: newPrice });
            setEditing(false);
        } else {
            setEditing(true);
        }
    }

    function handleDelete() {
        deleteProduct({ id });
    }

    return (
        <ProductItemContainer>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ProductItemImage src={imageUrl} alt="image" />
                <ProductItemTextContainer>
                    <ProductItemColumn>
                        <ProductItemTextType>Product Name :</ProductItemTextType>&emsp;
                        {editing ? (
                            <input
                                type="text"
                                value={newTitle}
                                onChange={(e) => {
                                    setNewTitle(e.target.value);
                                }}
                            />
                        ) : (
                            <ProdcutItemText>{newTitle}</ProdcutItemText>
                        )}
                    </ProductItemColumn>

                    <ProductItemColumn>
                        <ProductItemTextType>Price :</ProductItemTextType>&emsp;
                        {editing ? (
                            <input
                                type="number"
                                value={newPrice}
                                onChange={(e) => {
                                    setNewPrice(Number(e.target.value));
                                }}
                            />
                        ) : (
                            <ProdcutItemText>₩ {newPrice}</ProdcutItemText>
                        )}
                    </ProductItemColumn>

                    <ProductItemColumn>
                        <ProductItemTextType>Create :</ProductItemTextType>&emsp;
                        {createdAt ? (
                            <ProdcutItemText>{moment(createdAt).format('YYYY/MM/DD hh:mm:ss').toString()}</ProdcutItemText>
                        ) : (
                            <div style={{ color: 'red', fontWeight: 'bold' }}>삭제 된 상품입니다.</div>
                        )}
                    </ProductItemColumn>
                </ProductItemTextContainer>
            </div>
            <div style={{ gap: 20, position: 'absolute', right: 10, bottom: 10, display: 'flex' }}>
                <IconButton icon={editing ? faCheck : faPencil} onClick={handleEdit} color="#74a7fe" />
                <IconButton icon={faTrash} onClick={handleDelete} color="#ff8c82" />
            </div>
        </ProductItemContainer>
    );
}
