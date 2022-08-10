import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Json: any;
};

export type CreatePostInput = {
  slug: Scalars['String'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  post?: Maybe<Post>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: CreatePostResponse;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type Post = {
  __typename?: 'Post';
  content: PostContent;
  id: Scalars['ID'];
  slug: Scalars['String'];
};

export type PostBySlugInput = {
  slug: Scalars['String'];
};

export type PostBySlugResponse = {
  __typename?: 'PostBySlugResponse';
  post?: Maybe<Post>;
};

export type PostContent = {
  __typename?: 'PostContent';
  json: Scalars['Json'];
};

export type Query = {
  __typename?: 'Query';
  postBySlug: PostBySlugResponse;
};


export type QueryPostBySlugArgs = {
  input: PostBySlugInput;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreatePostInput: CreatePostInput;
  CreatePostResponse: ResolverTypeWrapper<CreatePostResponse>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Json: ResolverTypeWrapper<Scalars['Json']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  PostBySlugInput: PostBySlugInput;
  PostBySlugResponse: ResolverTypeWrapper<PostBySlugResponse>;
  PostContent: ResolverTypeWrapper<PostContent>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreatePostInput: CreatePostInput;
  CreatePostResponse: CreatePostResponse;
  ID: Scalars['ID'];
  Json: Scalars['Json'];
  Mutation: {};
  Post: Post;
  PostBySlugInput: PostBySlugInput;
  PostBySlugResponse: PostBySlugResponse;
  PostContent: PostContent;
  Query: {};
  String: Scalars['String'];
};

export type CreatePostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostResponse'] = ResolversParentTypes['CreatePostResponse']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Json'], any> {
  name: 'Json';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPost?: Resolver<ResolversTypes['CreatePostResponse'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  content?: Resolver<ResolversTypes['PostContent'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostBySlugResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostBySlugResponse'] = ResolversParentTypes['PostBySlugResponse']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostContentResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostContent'] = ResolversParentTypes['PostContent']> = {
  json?: Resolver<ResolversTypes['Json'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  postBySlug?: Resolver<ResolversTypes['PostBySlugResponse'], ParentType, ContextType, RequireFields<QueryPostBySlugArgs, 'input'>>;
};

export type Resolvers<ContextType = any> = {
  CreatePostResponse?: CreatePostResponseResolvers<ContextType>;
  Json?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostBySlugResponse?: PostBySlugResponseResolvers<ContextType>;
  PostContent?: PostContentResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

