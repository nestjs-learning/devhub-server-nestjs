import {DeepPartial, ID} from '@libs/common/shared/shared-types';
import {BeforeCreate, MongoEntity, PrimaryKey, Property, SerializedPrimaryKey} from 'mikro-orm';
// const keyType = primaryKeyType();
import {ObjectId} from 'bson';

/**
 * @description
 * 所有 entities 继承此类
 * @docsCategory entities
 */
/*export abstract class BaseEntity {
    protected constructor(input?: DeepPartial<BaseEntity>) {
        if (input) {
            for (const [ key, value ] of Object.entries(input)) {
                (this as any)[key] = value;
            }
        }
    }

    @PrimaryKey()
    _id!: ObjectID;

    @SerializedPrimaryKey()
    id!: string;
}*/

export abstract class BaseEntity implements MongoEntity<BaseEntity> {

    @PrimaryKey()
    _id!: ObjectId;

    @SerializedPrimaryKey()
    id!: string;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();
}
