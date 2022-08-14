import { GraphQLResolveInfo } from 'graphql';
import { Post as PrismaPost } from '.prisma/client';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ConnectionEdge = {
  __typename?: 'ConnectionEdge';
  node: ConnectionNode;
};

export type ConnectionNode = {
  id: Scalars['ID'];
};

export type CreatePostInput = {
  slug: Scalars['String'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  post?: Maybe<Post>;
};

export type EditPostContentInput = {
  markdown: Scalars['String'];
  slug: Scalars['String'];
};

export type EditPostContentResponse = {
  __typename?: 'EditPostContentResponse';
  post?: Maybe<Post>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: CreatePostResponse;
  editPostContent: EditPostContentResponse;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationEditPostContentArgs = {
  input: EditPostContentInput;
};

export type Post = ConnectionNode & {
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
  markdown: Scalars['String'];
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  edges: Array<ConnectionEdge>;
};

export type Query = {
  __typename?: 'Query';
  postBySlug: PostBySlugResponse;
  posts: PostsResponse;
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
  ConnectionEdge: ResolverTypeWrapper<ConnectionEdge>;
  ConnectionNode: ResolversTypes['Post'];
  CreatePostInput: CreatePostInput;
  CreatePostResponse: ResolverTypeWrapper<Omit<CreatePostResponse, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  EditPostContentInput: EditPostContentInput;
  EditPostContentResponse: ResolverTypeWrapper<Omit<EditPostContentResponse, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<PrismaPost>;
  PostBySlugInput: PostBySlugInput;
  PostBySlugResponse: ResolverTypeWrapper<Omit<PostBySlugResponse, 'post'> & { post?: Maybe<ResolversTypes['Post']> }>;
  PostContent: ResolverTypeWrapper<PostContent>;
  PostsResponse: ResolverTypeWrapper<PostsResponse>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ConnectionEdge: ConnectionEdge;
  ConnectionNode: ResolversParentTypes['Post'];
  CreatePostInput: CreatePostInput;
  CreatePostResponse: Omit<CreatePostResponse, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  EditPostContentInput: EditPostContentInput;
  EditPostContentResponse: Omit<EditPostContentResponse, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  ID: Scalars['ID'];
  Mutation: {};
  Post: PrismaPost;
  PostBySlugInput: PostBySlugInput;
  PostBySlugResponse: Omit<PostBySlugResponse, 'post'> & { post?: Maybe<ResolversParentTypes['Post']> };
  PostContent: PostContent;
  PostsResponse: PostsResponse;
  Query: {};
  String: Scalars['String'];
};

export type ConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectionEdge'] = ResolversParentTypes['ConnectionEdge']> = {
  node?: Resolver<ResolversTypes['ConnectionNode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConnectionNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConnectionNode'] = ResolversParentTypes['ConnectionNode']> = {
  __resolveType: TypeResolveFn<'Post', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type CreatePostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreatePostResponse'] = ResolversParentTypes['CreatePostResponse']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditPostContentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditPostContentResponse'] = ResolversParentTypes['EditPostContentResponse']> = {
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPost?: Resolver<ResolversTypes['CreatePostResponse'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  editPostContent?: Resolver<ResolversTypes['EditPostContentResponse'], ParentType, ContextType, RequireFields<MutationEditPostContentArgs, 'input'>>;
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
  markdown?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PostsResponse'] = ResolversParentTypes['PostsResponse']> = {
  edges?: Resolver<Array<ResolversTypes['ConnectionEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  postBySlug?: Resolver<ResolversTypes['PostBySlugResponse'], ParentType, ContextType, RequireFields<QueryPostBySlugArgs, 'input'>>;
  posts?: Resolver<ResolversTypes['PostsResponse'], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ConnectionEdge?: ConnectionEdgeResolvers<ContextType>;
  ConnectionNode?: ConnectionNodeResolvers<ContextType>;
  CreatePostResponse?: CreatePostResponseResolvers<ContextType>;
  EditPostContentResponse?: EditPostContentResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  PostBySlugResponse?: PostBySlugResponseResolvers<ContextType>;
  PostContent?: PostContentResolvers<ContextType>;
  PostsResponse?: PostsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};


export type EditPostContentMutationVariables = Exact<{
  input: EditPostContentInput;
}>;


export type EditPostContentMutation = { __typename?: 'Mutation', editPostContent: { __typename?: 'EditPostContentResponse', post?: { __typename?: 'Post', id: string, slug: string, content: { __typename?: 'PostContent', markdown: string } } | null } };

export type PostBySlugQueryVariables = Exact<{
  input: PostBySlugInput;
}>;


export type PostBySlugQuery = { __typename?: 'Query', postBySlug: { __typename?: 'PostBySlugResponse', post?: { __typename?: 'Post', id: string, slug: string, content: { __typename?: 'PostContent', markdown: string } } | null } };

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostsResponse', edges: Array<{ __typename?: 'ConnectionEdge', node: { __typename?: 'Post', id: string, slug: string, content: { __typename?: 'PostContent', markdown: string } } }> } };


export const EditPostContentDocument = gql`
    mutation EditPostContent($input: EditPostContentInput!) {
  editPostContent(input: $input) {
    post {
      id
      slug
      content {
        markdown
      }
    }
  }
}
    `;
export type EditPostContentMutationFn = Apollo.MutationFunction<EditPostContentMutation, EditPostContentMutationVariables>;

/**
 * __useEditPostContentMutation__
 *
 * To run a mutation, you first call `useEditPostContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostContentMutation, { data, loading, error }] = useEditPostContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditPostContentMutation(baseOptions?: Apollo.MutationHookOptions<EditPostContentMutation, EditPostContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostContentMutation, EditPostContentMutationVariables>(EditPostContentDocument, options);
      }
export type EditPostContentMutationHookResult = ReturnType<typeof useEditPostContentMutation>;
export type EditPostContentMutationResult = Apollo.MutationResult<EditPostContentMutation>;
export type EditPostContentMutationOptions = Apollo.BaseMutationOptions<EditPostContentMutation, EditPostContentMutationVariables>;
export const PostBySlugDocument = gql`
    query PostBySlug($input: PostBySlugInput!) {
  postBySlug(input: $input) {
    post {
      id
      slug
      content {
        markdown
      }
    }
  }
}
    `;

/**
 * __usePostBySlugQuery__
 *
 * To run a query within a React component, call `usePostBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostBySlugQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePostBySlugQuery(baseOptions: Apollo.QueryHookOptions<PostBySlugQuery, PostBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostBySlugQuery, PostBySlugQueryVariables>(PostBySlugDocument, options);
      }
export function usePostBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostBySlugQuery, PostBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostBySlugQuery, PostBySlugQueryVariables>(PostBySlugDocument, options);
        }
export type PostBySlugQueryHookResult = ReturnType<typeof usePostBySlugQuery>;
export type PostBySlugLazyQueryHookResult = ReturnType<typeof usePostBySlugLazyQuery>;
export type PostBySlugQueryResult = Apollo.QueryResult<PostBySlugQuery, PostBySlugQueryVariables>;
export const PostsDocument = gql`
    query Posts {
  posts {
    edges {
      node {
        ... on Post {
          id
          slug
          content {
            markdown
          }
        }
      }
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;