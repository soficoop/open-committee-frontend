export type Maybe<T> = T | null;
export type MaybePromise<T> = Promise<T> | T;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
 */
  DateTime: any,
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
  /** A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
 */
  Date: any,
  /** The `Long` scalar type represents 52-bit integers */
  Long: any,
  /** A time string with format: HH:mm:ss.SSS */
  Time: any,
};


export type AdminUser = {
  __typename?: 'AdminUser',
  id: Scalars['ID'],
  username?: Maybe<Scalars['String']>,
  firstname: Scalars['String'],
  lastname: Scalars['String'],
};

export type Area = {
  __typename?: 'Area',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  sid: Scalars['String'],
  committees?: Maybe<Array<Maybe<Committee>>>,
};


export type AreaCommitteesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type AreaAggregator = {
  __typename?: 'AreaAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type AreaConnection = {
  __typename?: 'AreaConnection',
  values?: Maybe<Array<Maybe<Area>>>,
  groupBy?: Maybe<AreaGroupBy>,
  aggregate?: Maybe<AreaAggregator>,
};

export type AreaConnection_Id = {
  __typename?: 'AreaConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<AreaConnection>,
};

export type AreaConnectionCreatedAt = {
  __typename?: 'AreaConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<AreaConnection>,
};

export type AreaConnectionId = {
  __typename?: 'AreaConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<AreaConnection>,
};

export type AreaConnectionSid = {
  __typename?: 'AreaConnectionSid',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<AreaConnection>,
};

export type AreaConnectionUpdatedAt = {
  __typename?: 'AreaConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<AreaConnection>,
};

export type AreaGroupBy = {
  __typename?: 'AreaGroupBy',
  id?: Maybe<Array<Maybe<AreaConnectionId>>>,
  _id?: Maybe<Array<Maybe<AreaConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<AreaConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<AreaConnectionUpdatedAt>>>,
  sid?: Maybe<Array<Maybe<AreaConnectionSid>>>,
};

export type AreaInput = {
  sid: Scalars['String'],
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

/** Comments on other content types */
export type Comment = {
  __typename?: 'Comment',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  title?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  parent?: Maybe<Comment>,
  user?: Maybe<UsersPermissionsUser>,
  isHidden?: Maybe<Scalars['Boolean']>,
  isPinned?: Maybe<Scalars['Boolean']>,
  plan?: Maybe<Plan>,
  children?: Maybe<Array<Maybe<Comment>>>,
  files?: Maybe<Array<Maybe<UploadFile>>>,
};


/** Comments on other content types */
export type CommentChildrenArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


/** Comments on other content types */
export type CommentFilesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type CommentAggregator = {
  __typename?: 'CommentAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type CommentConnection = {
  __typename?: 'CommentConnection',
  values?: Maybe<Array<Maybe<Comment>>>,
  groupBy?: Maybe<CommentGroupBy>,
  aggregate?: Maybe<CommentAggregator>,
};

export type CommentConnection_Id = {
  __typename?: 'CommentConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionContent = {
  __typename?: 'CommentConnectionContent',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionCreatedAt = {
  __typename?: 'CommentConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionId = {
  __typename?: 'CommentConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionIsHidden = {
  __typename?: 'CommentConnectionIsHidden',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionIsPinned = {
  __typename?: 'CommentConnectionIsPinned',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionName = {
  __typename?: 'CommentConnectionName',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionParent = {
  __typename?: 'CommentConnectionParent',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionPlan = {
  __typename?: 'CommentConnectionPlan',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionTitle = {
  __typename?: 'CommentConnectionTitle',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionUpdatedAt = {
  __typename?: 'CommentConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentConnectionUser = {
  __typename?: 'CommentConnectionUser',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommentConnection>,
};

export type CommentGroupBy = {
  __typename?: 'CommentGroupBy',
  id?: Maybe<Array<Maybe<CommentConnectionId>>>,
  _id?: Maybe<Array<Maybe<CommentConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<CommentConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<CommentConnectionUpdatedAt>>>,
  title?: Maybe<Array<Maybe<CommentConnectionTitle>>>,
  name?: Maybe<Array<Maybe<CommentConnectionName>>>,
  content?: Maybe<Array<Maybe<CommentConnectionContent>>>,
  parent?: Maybe<Array<Maybe<CommentConnectionParent>>>,
  user?: Maybe<Array<Maybe<CommentConnectionUser>>>,
  isHidden?: Maybe<Array<Maybe<CommentConnectionIsHidden>>>,
  isPinned?: Maybe<Array<Maybe<CommentConnectionIsPinned>>>,
  plan?: Maybe<Array<Maybe<CommentConnectionPlan>>>,
};

export type CommentInput = {
  title?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  parent?: Maybe<Scalars['ID']>,
  children?: Maybe<Array<Maybe<Scalars['ID']>>>,
  user?: Maybe<Scalars['ID']>,
  isHidden?: Maybe<Scalars['Boolean']>,
  isPinned?: Maybe<Scalars['Boolean']>,
  plan?: Maybe<Scalars['ID']>,
  files?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type Committee = {
  __typename?: 'Committee',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  sid: Scalars['String'],
  parent?: Maybe<Committee>,
  area?: Maybe<Area>,
  isHidden?: Maybe<Scalars['Boolean']>,
  pageUrl?: Maybe<Scalars['String']>,
  planScreenText?: Maybe<Scalars['String']>,
  children?: Maybe<Array<Maybe<Committee>>>,
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
  subscribedUsers?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
  meetings?: Maybe<Array<Maybe<Meeting>>>,
};


export type CommitteeChildrenArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type CommitteeUsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type CommitteeSubscribedUsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type CommitteeMeetingsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type CommitteeAggregator = {
  __typename?: 'CommitteeAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type CommitteeConnection = {
  __typename?: 'CommitteeConnection',
  values?: Maybe<Array<Maybe<Committee>>>,
  groupBy?: Maybe<CommitteeGroupBy>,
  aggregate?: Maybe<CommitteeAggregator>,
};

export type CommitteeConnection_Id = {
  __typename?: 'CommitteeConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionArea = {
  __typename?: 'CommitteeConnectionArea',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionCreatedAt = {
  __typename?: 'CommitteeConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionId = {
  __typename?: 'CommitteeConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionIsHidden = {
  __typename?: 'CommitteeConnectionIsHidden',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionPageUrl = {
  __typename?: 'CommitteeConnectionPageUrl',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionParent = {
  __typename?: 'CommitteeConnectionParent',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionPlanScreenText = {
  __typename?: 'CommitteeConnectionPlanScreenText',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionSid = {
  __typename?: 'CommitteeConnectionSid',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeConnectionUpdatedAt = {
  __typename?: 'CommitteeConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<CommitteeConnection>,
};

export type CommitteeGroupBy = {
  __typename?: 'CommitteeGroupBy',
  id?: Maybe<Array<Maybe<CommitteeConnectionId>>>,
  _id?: Maybe<Array<Maybe<CommitteeConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<CommitteeConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<CommitteeConnectionUpdatedAt>>>,
  sid?: Maybe<Array<Maybe<CommitteeConnectionSid>>>,
  parent?: Maybe<Array<Maybe<CommitteeConnectionParent>>>,
  area?: Maybe<Array<Maybe<CommitteeConnectionArea>>>,
  isHidden?: Maybe<Array<Maybe<CommitteeConnectionIsHidden>>>,
  pageUrl?: Maybe<Array<Maybe<CommitteeConnectionPageUrl>>>,
  planScreenText?: Maybe<Array<Maybe<CommitteeConnectionPlanScreenText>>>,
};

export type CommitteeInput = {
  sid: Scalars['String'],
  parent?: Maybe<Scalars['ID']>,
  area?: Maybe<Scalars['ID']>,
  children?: Maybe<Array<Maybe<Scalars['ID']>>>,
  users?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedUsers?: Maybe<Array<Maybe<Scalars['ID']>>>,
  meetings?: Maybe<Array<Maybe<Scalars['ID']>>>,
  isHidden?: Maybe<Scalars['Boolean']>,
  pageUrl?: Maybe<Scalars['String']>,
  planScreenText?: Maybe<Scalars['String']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type ComponentMiscLocation = {
  __typename?: 'ComponentMiscLocation',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  lat: Scalars['Float'],
  lng: Scalars['Float'],
  radius?: Maybe<Scalars['Float']>,
  name: Scalars['String'],
};

export type ComponentMiscLocationInput = {
  lat: Scalars['Float'],
  lng: Scalars['Float'],
  radius?: Maybe<Scalars['Float']>,
  name: Scalars['String'],
};

export type ContactApplicationInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  message: Scalars['String'],
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type ContactApplications = {
  __typename?: 'ContactApplications',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  email: Scalars['String'],
  message: Scalars['String'],
};

export type ContactApplicationsAggregator = {
  __typename?: 'ContactApplicationsAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type ContactApplicationsConnection = {
  __typename?: 'ContactApplicationsConnection',
  values?: Maybe<Array<Maybe<ContactApplications>>>,
  groupBy?: Maybe<ContactApplicationsGroupBy>,
  aggregate?: Maybe<ContactApplicationsAggregator>,
};

export type ContactApplicationsConnection_Id = {
  __typename?: 'ContactApplicationsConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<ContactApplicationsConnection>,
};

export type ContactApplicationsConnectionCreatedAt = {
  __typename?: 'ContactApplicationsConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<ContactApplicationsConnection>,
};

export type ContactApplicationsConnectionEmail = {
  __typename?: 'ContactApplicationsConnectionEmail',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ContactApplicationsConnection>,
};

export type ContactApplicationsConnectionId = {
  __typename?: 'ContactApplicationsConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<ContactApplicationsConnection>,
};

export type ContactApplicationsConnectionMessage = {
  __typename?: 'ContactApplicationsConnectionMessage',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ContactApplicationsConnection>,
};

export type ContactApplicationsConnectionName = {
  __typename?: 'ContactApplicationsConnectionName',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ContactApplicationsConnection>,
};

export type ContactApplicationsConnectionUpdatedAt = {
  __typename?: 'ContactApplicationsConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<ContactApplicationsConnection>,
};

export type ContactApplicationsGroupBy = {
  __typename?: 'ContactApplicationsGroupBy',
  id?: Maybe<Array<Maybe<ContactApplicationsConnectionId>>>,
  _id?: Maybe<Array<Maybe<ContactApplicationsConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<ContactApplicationsConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<ContactApplicationsConnectionUpdatedAt>>>,
  name?: Maybe<Array<Maybe<ContactApplicationsConnectionName>>>,
  email?: Maybe<Array<Maybe<ContactApplicationsConnectionEmail>>>,
  message?: Maybe<Array<Maybe<ContactApplicationsConnectionMessage>>>,
};

export type CreateAreaInput = {
  data?: Maybe<AreaInput>,
};

export type CreateAreaPayload = {
  __typename?: 'createAreaPayload',
  area?: Maybe<Area>,
};

export type CreateCommentInput = {
  data?: Maybe<CommentInput>,
};

export type CreateCommentPayload = {
  __typename?: 'createCommentPayload',
  comment?: Maybe<Comment>,
};

export type CreateCommitteeInput = {
  data?: Maybe<CommitteeInput>,
};

export type CreateCommitteePayload = {
  __typename?: 'createCommitteePayload',
  committee?: Maybe<Committee>,
};

export type CreateContactApplicationInput = {
  data?: Maybe<ContactApplicationInput>,
};

export type CreateContactApplicationPayload = {
  __typename?: 'createContactApplicationPayload',
  contactApplication?: Maybe<ContactApplications>,
};

export type CreateMeetingInput = {
  data?: Maybe<MeetingInput>,
};

export type CreateMeetingPayload = {
  __typename?: 'createMeetingPayload',
  meeting?: Maybe<Meeting>,
};

export type CreateMunicipalityInput = {
  data?: Maybe<MunicipalityInput>,
};

export type CreateMunicipalityPayload = {
  __typename?: 'createMunicipalityPayload',
  municipality?: Maybe<Municipality>,
};

export type CreateParserInput = {
  data?: Maybe<ParserInput>,
};

export type CreateParserPayload = {
  __typename?: 'createParserPayload',
  parser?: Maybe<Parser>,
};

export type CreatePlanInput = {
  data?: Maybe<PlanInput>,
};

export type CreatePlanPayload = {
  __typename?: 'createPlanPayload',
  plan?: Maybe<Plan>,
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>,
};

export type CreateRolePayload = {
  __typename?: 'createRolePayload',
  role?: Maybe<UsersPermissionsRole>,
};

export type CreateTagInput = {
  data?: Maybe<TagInput>,
};

export type CreateTagPayload = {
  __typename?: 'createTagPayload',
  tag?: Maybe<Tag>,
};

export type CreateTermInput = {
  data?: Maybe<TermInput>,
};

export type CreateTermPayload = {
  __typename?: 'createTermPayload',
  term?: Maybe<Term>,
};

export type CreateUserInput = {
  data?: Maybe<UserInput>,
};

export type CreateUserPayload = {
  __typename?: 'createUserPayload',
  user?: Maybe<UsersPermissionsUser>,
};



export type DeleteAreaInput = {
  where?: Maybe<InputId>,
};

export type DeleteAreaPayload = {
  __typename?: 'deleteAreaPayload',
  area?: Maybe<Area>,
};

export type DeleteCommentInput = {
  where?: Maybe<InputId>,
};

export type DeleteCommentPayload = {
  __typename?: 'deleteCommentPayload',
  comment?: Maybe<Comment>,
};

export type DeleteCommitteeInput = {
  where?: Maybe<InputId>,
};

export type DeleteCommitteePayload = {
  __typename?: 'deleteCommitteePayload',
  committee?: Maybe<Committee>,
};

export type DeleteContactApplicationInput = {
  where?: Maybe<InputId>,
};

export type DeleteContactApplicationPayload = {
  __typename?: 'deleteContactApplicationPayload',
  contactApplication?: Maybe<ContactApplications>,
};

export type DeleteFileInput = {
  where?: Maybe<InputId>,
};

export type DeleteFilePayload = {
  __typename?: 'deleteFilePayload',
  file?: Maybe<UploadFile>,
};

export type DeleteMeetingInput = {
  where?: Maybe<InputId>,
};

export type DeleteMeetingPayload = {
  __typename?: 'deleteMeetingPayload',
  meeting?: Maybe<Meeting>,
};

export type DeleteMunicipalityInput = {
  where?: Maybe<InputId>,
};

export type DeleteMunicipalityPayload = {
  __typename?: 'deleteMunicipalityPayload',
  municipality?: Maybe<Municipality>,
};

export type DeleteParserInput = {
  where?: Maybe<InputId>,
};

export type DeleteParserPayload = {
  __typename?: 'deleteParserPayload',
  parser?: Maybe<Parser>,
};

export type DeletePlanInput = {
  where?: Maybe<InputId>,
};

export type DeletePlanPayload = {
  __typename?: 'deletePlanPayload',
  plan?: Maybe<Plan>,
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>,
};

export type DeleteRolePayload = {
  __typename?: 'deleteRolePayload',
  role?: Maybe<UsersPermissionsRole>,
};

export type DeleteTagInput = {
  where?: Maybe<InputId>,
};

export type DeleteTagPayload = {
  __typename?: 'deleteTagPayload',
  tag?: Maybe<Tag>,
};

export type DeleteTermInput = {
  where?: Maybe<InputId>,
};

export type DeleteTermPayload = {
  __typename?: 'deleteTermPayload',
  term?: Maybe<Term>,
};

export type DeleteUserInput = {
  where?: Maybe<InputId>,
};

export type DeleteUserPayload = {
  __typename?: 'deleteUserPayload',
  user?: Maybe<UsersPermissionsUser>,
};

export type EditAreaInput = {
  sid?: Maybe<Scalars['String']>,
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditCommentInput = {
  title?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  parent?: Maybe<Scalars['ID']>,
  children?: Maybe<Array<Maybe<Scalars['ID']>>>,
  user?: Maybe<Scalars['ID']>,
  isHidden?: Maybe<Scalars['Boolean']>,
  isPinned?: Maybe<Scalars['Boolean']>,
  plan?: Maybe<Scalars['ID']>,
  files?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditCommitteeInput = {
  sid?: Maybe<Scalars['String']>,
  parent?: Maybe<Scalars['ID']>,
  area?: Maybe<Scalars['ID']>,
  children?: Maybe<Array<Maybe<Scalars['ID']>>>,
  users?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedUsers?: Maybe<Array<Maybe<Scalars['ID']>>>,
  meetings?: Maybe<Array<Maybe<Scalars['ID']>>>,
  isHidden?: Maybe<Scalars['Boolean']>,
  pageUrl?: Maybe<Scalars['String']>,
  planScreenText?: Maybe<Scalars['String']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditComponentMiscLocationInput = {
  id?: Maybe<Scalars['ID']>,
  lat?: Maybe<Scalars['Float']>,
  lng?: Maybe<Scalars['Float']>,
  radius?: Maybe<Scalars['Float']>,
  name?: Maybe<Scalars['String']>,
};

export type EditContactApplicationInput = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  message?: Maybe<Scalars['String']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditFileInput = {
  name?: Maybe<Scalars['String']>,
  alternativeText?: Maybe<Scalars['String']>,
  caption?: Maybe<Scalars['String']>,
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  formats?: Maybe<Scalars['JSON']>,
  hash?: Maybe<Scalars['String']>,
  ext?: Maybe<Scalars['String']>,
  mime?: Maybe<Scalars['String']>,
  size?: Maybe<Scalars['Float']>,
  url?: Maybe<Scalars['String']>,
  previewUrl?: Maybe<Scalars['String']>,
  provider?: Maybe<Scalars['String']>,
  provider_metadata?: Maybe<Scalars['JSON']>,
  related?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditMeetingInput = {
  date?: Maybe<Scalars['DateTime']>,
  number?: Maybe<Scalars['Int']>,
  decisions?: Maybe<Scalars['ID']>,
  protocol?: Maybe<Scalars['ID']>,
  transcript?: Maybe<Scalars['ID']>,
  sid?: Maybe<Scalars['String']>,
  addedManually?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  additionalFiles?: Maybe<Array<Maybe<Scalars['ID']>>>,
  background?: Maybe<Scalars['String']>,
  summary?: Maybe<Scalars['String']>,
  emailViews?: Maybe<Scalars['Int']>,
  isHidden?: Maybe<Scalars['Boolean']>,
  plans?: Maybe<Array<Maybe<Scalars['ID']>>>,
  committee?: Maybe<Scalars['ID']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditMunicipalityInput = {
  sid?: Maybe<Scalars['String']>,
  plans?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedUsers?: Maybe<Array<Maybe<Scalars['ID']>>>,
  isHidden?: Maybe<Scalars['Boolean']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditParserInput = {
  for?: Maybe<Enum_Parser_For>,
  url?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Boolean']>,
  objectSelector?: Maybe<Scalars['String']>,
  sidMatch?: Maybe<Scalars['String']>,
  fields?: Maybe<Scalars['String']>,
  urlByExistingItem?: Maybe<Enum_Parser_Urlbyexistingitem>,
  method?: Maybe<Enum_Parser_Method>,
  requestParams?: Maybe<Scalars['String']>,
  fileFields?: Maybe<Scalars['String']>,
  isJson?: Maybe<Scalars['Boolean']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditPlanInput = {
  name?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  lastUpdate?: Maybe<Scalars['DateTime']>,
  location?: Maybe<Scalars['String']>,
  municipality?: Maybe<Scalars['String']>,
  settlement?: Maybe<Scalars['String']>,
  sections?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  sid?: Maybe<Scalars['String']>,
  targets?: Maybe<Scalars['String']>,
  number?: Maybe<Scalars['String']>,
  submission?: Maybe<Scalars['DateTime']>,
  stype?: Maybe<Scalars['Int']>,
  addedManually?: Maybe<Scalars['Boolean']>,
  attachedFiles?: Maybe<Array<Maybe<Scalars['ID']>>>,
  street?: Maybe<Scalars['String']>,
  houseNumber?: Maybe<Scalars['Int']>,
  meetings?: Maybe<Array<Maybe<Scalars['ID']>>>,
  commentsAreLocked?: Maybe<Scalars['Boolean']>,
  comments?: Maybe<Array<Maybe<Scalars['ID']>>>,
  tags?: Maybe<Array<Maybe<Scalars['ID']>>>,
  municipalities?: Maybe<Array<Maybe<Scalars['ID']>>>,
  geometry?: Maybe<Scalars['JSON']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditRoleInput = {
  name?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>,
  users?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditTagInput = {
  name?: Maybe<Scalars['String']>,
  plans?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedUsers?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditTermInput = {
  phrase?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  published_at?: Maybe<Scalars['DateTime']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EditUserInput = {
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  provider?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  resetPasswordToken?: Maybe<Scalars['String']>,
  confirmed?: Maybe<Scalars['Boolean']>,
  blocked?: Maybe<Scalars['Boolean']>,
  confirmationToken?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['ID']>,
  firstName?: Maybe<Scalars['String']>,
  lastName?: Maybe<Scalars['String']>,
  city?: Maybe<Scalars['String']>,
  organization?: Maybe<Scalars['String']>,
  job?: Maybe<Scalars['String']>,
  userImage?: Maybe<Scalars['ID']>,
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedCommittees?: Maybe<Array<Maybe<Scalars['ID']>>>,
  comments?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedTags?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedMunicipalities?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedLocations?: Maybe<Array<Maybe<EditComponentMiscLocationInput>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type EmailMeetingInput = {
  where: InputId,
};

export type EmailMeetingPayload = {
  __typename?: 'emailMeetingPayload',
  meeting?: Maybe<Meeting>,
  recipients?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
};

export enum Enum_Parser_For {
  Area = 'area',
  Committee = 'committee',
  Meeting = 'meeting',
  Plan = 'plan',
  Municipality = 'municipality'
}

export enum Enum_Parser_Method {
  Get = 'get',
  Post = 'post'
}

export enum Enum_Parser_Urlbyexistingitem {
  None = 'none',
  Area = 'area',
  Committee = 'committee',
  Meeting = 'meeting',
  Plan = 'plan'
}

export type FileInfoInput = {
  name?: Maybe<Scalars['String']>,
  alternativeText?: Maybe<Scalars['String']>,
  caption?: Maybe<Scalars['String']>,
};

export type FileInput = {
  name: Scalars['String'],
  alternativeText?: Maybe<Scalars['String']>,
  caption?: Maybe<Scalars['String']>,
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  formats?: Maybe<Scalars['JSON']>,
  hash: Scalars['String'],
  ext?: Maybe<Scalars['String']>,
  mime: Scalars['String'],
  size: Scalars['Float'],
  url: Scalars['String'],
  previewUrl?: Maybe<Scalars['String']>,
  provider: Scalars['String'],
  provider_metadata?: Maybe<Scalars['JSON']>,
  related?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type InputId = {
  id: Scalars['ID'],
};



export type Meeting = {
  __typename?: 'Meeting',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  date?: Maybe<Scalars['DateTime']>,
  number?: Maybe<Scalars['Int']>,
  decisions?: Maybe<UploadFile>,
  protocol?: Maybe<UploadFile>,
  transcript?: Maybe<UploadFile>,
  sid?: Maybe<Scalars['String']>,
  addedManually?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  background?: Maybe<Scalars['String']>,
  summary?: Maybe<Scalars['String']>,
  emailViews?: Maybe<Scalars['Int']>,
  isHidden?: Maybe<Scalars['Boolean']>,
  committee?: Maybe<Committee>,
  additionalFiles?: Maybe<Array<Maybe<UploadFile>>>,
  plans?: Maybe<Array<Maybe<Plan>>>,
};


export type MeetingAdditionalFilesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type MeetingPlansArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type MeetingAggregator = {
  __typename?: 'MeetingAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
  sum?: Maybe<MeetingAggregatorSum>,
  avg?: Maybe<MeetingAggregatorAvg>,
  min?: Maybe<MeetingAggregatorMin>,
  max?: Maybe<MeetingAggregatorMax>,
};

export type MeetingAggregatorAvg = {
  __typename?: 'MeetingAggregatorAvg',
  number?: Maybe<Scalars['Float']>,
  emailViews?: Maybe<Scalars['Float']>,
};

export type MeetingAggregatorMax = {
  __typename?: 'MeetingAggregatorMax',
  number?: Maybe<Scalars['Float']>,
  emailViews?: Maybe<Scalars['Float']>,
};

export type MeetingAggregatorMin = {
  __typename?: 'MeetingAggregatorMin',
  number?: Maybe<Scalars['Float']>,
  emailViews?: Maybe<Scalars['Float']>,
};

export type MeetingAggregatorSum = {
  __typename?: 'MeetingAggregatorSum',
  number?: Maybe<Scalars['Float']>,
  emailViews?: Maybe<Scalars['Float']>,
};

export type MeetingConnection = {
  __typename?: 'MeetingConnection',
  values?: Maybe<Array<Maybe<Meeting>>>,
  groupBy?: Maybe<MeetingGroupBy>,
  aggregate?: Maybe<MeetingAggregator>,
};

export type MeetingConnection_Id = {
  __typename?: 'MeetingConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionAddedManually = {
  __typename?: 'MeetingConnectionAddedManually',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionBackground = {
  __typename?: 'MeetingConnectionBackground',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionCommittee = {
  __typename?: 'MeetingConnectionCommittee',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionCreatedAt = {
  __typename?: 'MeetingConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionDate = {
  __typename?: 'MeetingConnectionDate',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionDecisions = {
  __typename?: 'MeetingConnectionDecisions',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionEmailViews = {
  __typename?: 'MeetingConnectionEmailViews',
  key?: Maybe<Scalars['Int']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionId = {
  __typename?: 'MeetingConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionIsHidden = {
  __typename?: 'MeetingConnectionIsHidden',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionNumber = {
  __typename?: 'MeetingConnectionNumber',
  key?: Maybe<Scalars['Int']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionProtocol = {
  __typename?: 'MeetingConnectionProtocol',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionSid = {
  __typename?: 'MeetingConnectionSid',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionSummary = {
  __typename?: 'MeetingConnectionSummary',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionTitle = {
  __typename?: 'MeetingConnectionTitle',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionTranscript = {
  __typename?: 'MeetingConnectionTranscript',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingConnectionUpdatedAt = {
  __typename?: 'MeetingConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<MeetingConnection>,
};

export type MeetingGroupBy = {
  __typename?: 'MeetingGroupBy',
  id?: Maybe<Array<Maybe<MeetingConnectionId>>>,
  _id?: Maybe<Array<Maybe<MeetingConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<MeetingConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<MeetingConnectionUpdatedAt>>>,
  date?: Maybe<Array<Maybe<MeetingConnectionDate>>>,
  number?: Maybe<Array<Maybe<MeetingConnectionNumber>>>,
  decisions?: Maybe<Array<Maybe<MeetingConnectionDecisions>>>,
  protocol?: Maybe<Array<Maybe<MeetingConnectionProtocol>>>,
  transcript?: Maybe<Array<Maybe<MeetingConnectionTranscript>>>,
  sid?: Maybe<Array<Maybe<MeetingConnectionSid>>>,
  addedManually?: Maybe<Array<Maybe<MeetingConnectionAddedManually>>>,
  title?: Maybe<Array<Maybe<MeetingConnectionTitle>>>,
  background?: Maybe<Array<Maybe<MeetingConnectionBackground>>>,
  summary?: Maybe<Array<Maybe<MeetingConnectionSummary>>>,
  emailViews?: Maybe<Array<Maybe<MeetingConnectionEmailViews>>>,
  isHidden?: Maybe<Array<Maybe<MeetingConnectionIsHidden>>>,
  committee?: Maybe<Array<Maybe<MeetingConnectionCommittee>>>,
};

export type MeetingInput = {
  date?: Maybe<Scalars['DateTime']>,
  number?: Maybe<Scalars['Int']>,
  decisions?: Maybe<Scalars['ID']>,
  protocol?: Maybe<Scalars['ID']>,
  transcript?: Maybe<Scalars['ID']>,
  sid?: Maybe<Scalars['String']>,
  addedManually?: Maybe<Scalars['Boolean']>,
  title?: Maybe<Scalars['String']>,
  additionalFiles?: Maybe<Array<Maybe<Scalars['ID']>>>,
  background?: Maybe<Scalars['String']>,
  summary?: Maybe<Scalars['String']>,
  emailViews?: Maybe<Scalars['Int']>,
  isHidden?: Maybe<Scalars['Boolean']>,
  plans?: Maybe<Array<Maybe<Scalars['ID']>>>,
  committee?: Maybe<Scalars['ID']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type Morph = UsersPermissionsMe | UsersPermissionsMeRole | UsersPermissionsLoginPayload | UserPermissionsPasswordPayload | EmailMeetingPayload | Area | AreaConnection | AreaAggregator | AreaGroupBy | AreaConnectionId | AreaConnection_Id | AreaConnectionCreatedAt | AreaConnectionUpdatedAt | AreaConnectionSid | CreateAreaPayload | UpdateAreaPayload | DeleteAreaPayload | Comment | CommentConnection | CommentAggregator | CommentGroupBy | CommentConnectionId | CommentConnection_Id | CommentConnectionCreatedAt | CommentConnectionUpdatedAt | CommentConnectionTitle | CommentConnectionName | CommentConnectionContent | CommentConnectionParent | CommentConnectionUser | CommentConnectionIsHidden | CommentConnectionIsPinned | CommentConnectionPlan | CreateCommentPayload | UpdateCommentPayload | DeleteCommentPayload | Committee | CommitteeConnection | CommitteeAggregator | CommitteeGroupBy | CommitteeConnectionId | CommitteeConnection_Id | CommitteeConnectionCreatedAt | CommitteeConnectionUpdatedAt | CommitteeConnectionSid | CommitteeConnectionParent | CommitteeConnectionArea | CommitteeConnectionIsHidden | CommitteeConnectionPageUrl | CommitteeConnectionPlanScreenText | CreateCommitteePayload | UpdateCommitteePayload | DeleteCommitteePayload | ContactApplications | ContactApplicationsConnection | ContactApplicationsAggregator | ContactApplicationsGroupBy | ContactApplicationsConnectionId | ContactApplicationsConnection_Id | ContactApplicationsConnectionCreatedAt | ContactApplicationsConnectionUpdatedAt | ContactApplicationsConnectionName | ContactApplicationsConnectionEmail | ContactApplicationsConnectionMessage | CreateContactApplicationPayload | UpdateContactApplicationPayload | DeleteContactApplicationPayload | Meeting | MeetingConnection | MeetingAggregator | MeetingAggregatorSum | MeetingAggregatorAvg | MeetingAggregatorMin | MeetingAggregatorMax | MeetingGroupBy | MeetingConnectionId | MeetingConnection_Id | MeetingConnectionCreatedAt | MeetingConnectionUpdatedAt | MeetingConnectionDate | MeetingConnectionNumber | MeetingConnectionDecisions | MeetingConnectionProtocol | MeetingConnectionTranscript | MeetingConnectionSid | MeetingConnectionAddedManually | MeetingConnectionTitle | MeetingConnectionBackground | MeetingConnectionSummary | MeetingConnectionEmailViews | MeetingConnectionIsHidden | MeetingConnectionCommittee | CreateMeetingPayload | UpdateMeetingPayload | DeleteMeetingPayload | Municipality | MunicipalityConnection | MunicipalityAggregator | MunicipalityGroupBy | MunicipalityConnectionId | MunicipalityConnection_Id | MunicipalityConnectionCreatedAt | MunicipalityConnectionUpdatedAt | MunicipalityConnectionSid | MunicipalityConnectionIsHidden | CreateMunicipalityPayload | UpdateMunicipalityPayload | DeleteMunicipalityPayload | Parser | ParserConnection | ParserAggregator | ParserGroupBy | ParserConnectionId | ParserConnection_Id | ParserConnectionCreatedAt | ParserConnectionUpdatedAt | ParserConnectionFor | ParserConnectionUrl | ParserConnectionActive | ParserConnectionObjectSelector | ParserConnectionSidMatch | ParserConnectionFields | ParserConnectionUrlByExistingItem | ParserConnectionMethod | ParserConnectionRequestParams | ParserConnectionFileFields | ParserConnectionIsJson | CreateParserPayload | UpdateParserPayload | DeleteParserPayload | Plan | PlanConnection | PlanAggregator | PlanAggregatorSum | PlanAggregatorAvg | PlanAggregatorMin | PlanAggregatorMax | PlanGroupBy | PlanConnectionId | PlanConnection_Id | PlanConnectionCreatedAt | PlanConnectionUpdatedAt | PlanConnectionName | PlanConnectionStatus | PlanConnectionLastUpdate | PlanConnectionLocation | PlanConnectionMunicipality | PlanConnectionSettlement | PlanConnectionSections | PlanConnectionType | PlanConnectionSid | PlanConnectionTargets | PlanConnectionNumber | PlanConnectionSubmission | PlanConnectionStype | PlanConnectionAddedManually | PlanConnectionStreet | PlanConnectionHouseNumber | PlanConnectionCommentsAreLocked | PlanConnectionGeometry | CreatePlanPayload | UpdatePlanPayload | DeletePlanPayload | Tag | TagConnection | TagAggregator | TagGroupBy | TagConnectionId | TagConnection_Id | TagConnectionCreatedAt | TagConnectionUpdatedAt | TagConnectionName | CreateTagPayload | UpdateTagPayload | DeleteTagPayload | Term | TermConnection | TermAggregator | TermGroupBy | TermConnectionId | TermConnection_Id | TermConnectionCreatedAt | TermConnectionUpdatedAt | TermConnectionPhrase | TermConnectionDescription | TermConnectionPublished_At | CreateTermPayload | UpdateTermPayload | DeleteTermPayload | UploadFile | UploadFileConnection | UploadFileAggregator | UploadFileAggregatorSum | UploadFileAggregatorAvg | UploadFileAggregatorMin | UploadFileAggregatorMax | UploadFileGroupBy | UploadFileConnectionId | UploadFileConnection_Id | UploadFileConnectionCreatedAt | UploadFileConnectionUpdatedAt | UploadFileConnectionName | UploadFileConnectionAlternativeText | UploadFileConnectionCaption | UploadFileConnectionWidth | UploadFileConnectionHeight | UploadFileConnectionFormats | UploadFileConnectionHash | UploadFileConnectionExt | UploadFileConnectionMime | UploadFileConnectionSize | UploadFileConnectionUrl | UploadFileConnectionPreviewUrl | UploadFileConnectionProvider | UploadFileConnectionProvider_Metadata | DeleteFilePayload | UsersPermissionsPermission | UsersPermissionsRole | UsersPermissionsRoleConnection | UsersPermissionsRoleAggregator | UsersPermissionsRoleGroupBy | UsersPermissionsRoleConnectionId | UsersPermissionsRoleConnection_Id | UsersPermissionsRoleConnectionName | UsersPermissionsRoleConnectionDescription | UsersPermissionsRoleConnectionType | CreateRolePayload | UpdateRolePayload | DeleteRolePayload | UsersPermissionsUser | UsersPermissionsUserConnection | UsersPermissionsUserAggregator | UsersPermissionsUserGroupBy | UsersPermissionsUserConnectionId | UsersPermissionsUserConnection_Id | UsersPermissionsUserConnectionCreatedAt | UsersPermissionsUserConnectionUpdatedAt | UsersPermissionsUserConnectionUsername | UsersPermissionsUserConnectionEmail | UsersPermissionsUserConnectionProvider | UsersPermissionsUserConnectionConfirmed | UsersPermissionsUserConnectionBlocked | UsersPermissionsUserConnectionRole | UsersPermissionsUserConnectionFirstName | UsersPermissionsUserConnectionLastName | UsersPermissionsUserConnectionCity | UsersPermissionsUserConnectionOrganization | UsersPermissionsUserConnectionJob | UsersPermissionsUserConnectionUserImage | CreateUserPayload | UpdateUserPayload | DeleteUserPayload | ComponentMiscLocation;

export type Municipality = {
  __typename?: 'Municipality',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  sid: Scalars['String'],
  isHidden?: Maybe<Scalars['Boolean']>,
  plans?: Maybe<Array<Maybe<Plan>>>,
  subscribedUsers?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
};


export type MunicipalityPlansArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type MunicipalitySubscribedUsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type MunicipalityAggregator = {
  __typename?: 'MunicipalityAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type MunicipalityConnection = {
  __typename?: 'MunicipalityConnection',
  values?: Maybe<Array<Maybe<Municipality>>>,
  groupBy?: Maybe<MunicipalityGroupBy>,
  aggregate?: Maybe<MunicipalityAggregator>,
};

export type MunicipalityConnection_Id = {
  __typename?: 'MunicipalityConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<MunicipalityConnection>,
};

export type MunicipalityConnectionCreatedAt = {
  __typename?: 'MunicipalityConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<MunicipalityConnection>,
};

export type MunicipalityConnectionId = {
  __typename?: 'MunicipalityConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<MunicipalityConnection>,
};

export type MunicipalityConnectionIsHidden = {
  __typename?: 'MunicipalityConnectionIsHidden',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<MunicipalityConnection>,
};

export type MunicipalityConnectionSid = {
  __typename?: 'MunicipalityConnectionSid',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<MunicipalityConnection>,
};

export type MunicipalityConnectionUpdatedAt = {
  __typename?: 'MunicipalityConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<MunicipalityConnection>,
};

export type MunicipalityGroupBy = {
  __typename?: 'MunicipalityGroupBy',
  id?: Maybe<Array<Maybe<MunicipalityConnectionId>>>,
  _id?: Maybe<Array<Maybe<MunicipalityConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<MunicipalityConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<MunicipalityConnectionUpdatedAt>>>,
  sid?: Maybe<Array<Maybe<MunicipalityConnectionSid>>>,
  isHidden?: Maybe<Array<Maybe<MunicipalityConnectionIsHidden>>>,
};

export type MunicipalityInput = {
  sid: Scalars['String'],
  plans?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedUsers?: Maybe<Array<Maybe<Scalars['ID']>>>,
  isHidden?: Maybe<Scalars['Boolean']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type Mutation = {
  __typename?: 'Mutation',
  createArea?: Maybe<CreateAreaPayload>,
  updateArea?: Maybe<UpdateAreaPayload>,
  deleteArea?: Maybe<DeleteAreaPayload>,
  createComment?: Maybe<CreateCommentPayload>,
  updateComment?: Maybe<UpdateCommentPayload>,
  deleteComment?: Maybe<DeleteCommentPayload>,
  createCommittee?: Maybe<CreateCommitteePayload>,
  updateCommittee?: Maybe<UpdateCommitteePayload>,
  deleteCommittee?: Maybe<DeleteCommitteePayload>,
  createContactApplication?: Maybe<CreateContactApplicationPayload>,
  updateContactApplication?: Maybe<UpdateContactApplicationPayload>,
  deleteContactApplication?: Maybe<DeleteContactApplicationPayload>,
  createMeeting?: Maybe<CreateMeetingPayload>,
  updateMeeting?: Maybe<UpdateMeetingPayload>,
  deleteMeeting?: Maybe<DeleteMeetingPayload>,
  createMunicipality?: Maybe<CreateMunicipalityPayload>,
  updateMunicipality?: Maybe<UpdateMunicipalityPayload>,
  deleteMunicipality?: Maybe<DeleteMunicipalityPayload>,
  createParser?: Maybe<CreateParserPayload>,
  updateParser?: Maybe<UpdateParserPayload>,
  deleteParser?: Maybe<DeleteParserPayload>,
  createPlan?: Maybe<CreatePlanPayload>,
  updatePlan?: Maybe<UpdatePlanPayload>,
  deletePlan?: Maybe<DeletePlanPayload>,
  createTag?: Maybe<CreateTagPayload>,
  updateTag?: Maybe<UpdateTagPayload>,
  deleteTag?: Maybe<DeleteTagPayload>,
  createTerm?: Maybe<CreateTermPayload>,
  updateTerm?: Maybe<UpdateTermPayload>,
  deleteTerm?: Maybe<DeleteTermPayload>,
  /** Delete one file */
  deleteFile?: Maybe<DeleteFilePayload>,
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>,
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>,
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>,
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>,
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>,
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>,
  upload: UploadFile,
  multipleUpload: Array<Maybe<UploadFile>>,
  updateFileInfo: UploadFile,
  login: UsersPermissionsLoginPayload,
  register: UsersPermissionsLoginPayload,
  forgotPassword?: Maybe<UserPermissionsPasswordPayload>,
  resetPassword?: Maybe<UsersPermissionsLoginPayload>,
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>,
  updateMe?: Maybe<UpdateUserPayload>,
  tokenSignIn: UsersPermissionsLoginPayload,
  updateMyComment?: Maybe<UpdateCommentPayload>,
  emailMeeting?: Maybe<EmailMeetingPayload>,
  updateMyMeeting?: Maybe<UpdateMeetingPayload>,
  updateMyPlan?: Maybe<UpdatePlanPayload>,
  tagPlan?: Maybe<UpdatePlanPayload>,
};


export type MutationCreateAreaArgs = {
  input?: Maybe<CreateAreaInput>
};


export type MutationUpdateAreaArgs = {
  input?: Maybe<UpdateAreaInput>
};


export type MutationDeleteAreaArgs = {
  input?: Maybe<DeleteAreaInput>
};


export type MutationCreateCommentArgs = {
  input?: Maybe<CreateCommentInput>
};


export type MutationUpdateCommentArgs = {
  input?: Maybe<UpdateCommentInput>
};


export type MutationDeleteCommentArgs = {
  input?: Maybe<DeleteCommentInput>
};


export type MutationCreateCommitteeArgs = {
  input?: Maybe<CreateCommitteeInput>
};


export type MutationUpdateCommitteeArgs = {
  input?: Maybe<UpdateCommitteeInput>
};


export type MutationDeleteCommitteeArgs = {
  input?: Maybe<DeleteCommitteeInput>
};


export type MutationCreateContactApplicationArgs = {
  input?: Maybe<CreateContactApplicationInput>
};


export type MutationUpdateContactApplicationArgs = {
  input?: Maybe<UpdateContactApplicationInput>
};


export type MutationDeleteContactApplicationArgs = {
  input?: Maybe<DeleteContactApplicationInput>
};


export type MutationCreateMeetingArgs = {
  input?: Maybe<CreateMeetingInput>
};


export type MutationUpdateMeetingArgs = {
  input?: Maybe<UpdateMeetingInput>
};


export type MutationDeleteMeetingArgs = {
  input?: Maybe<DeleteMeetingInput>
};


export type MutationCreateMunicipalityArgs = {
  input?: Maybe<CreateMunicipalityInput>
};


export type MutationUpdateMunicipalityArgs = {
  input?: Maybe<UpdateMunicipalityInput>
};


export type MutationDeleteMunicipalityArgs = {
  input?: Maybe<DeleteMunicipalityInput>
};


export type MutationCreateParserArgs = {
  input?: Maybe<CreateParserInput>
};


export type MutationUpdateParserArgs = {
  input?: Maybe<UpdateParserInput>
};


export type MutationDeleteParserArgs = {
  input?: Maybe<DeleteParserInput>
};


export type MutationCreatePlanArgs = {
  input?: Maybe<CreatePlanInput>
};


export type MutationUpdatePlanArgs = {
  input?: Maybe<UpdatePlanInput>
};


export type MutationDeletePlanArgs = {
  input?: Maybe<DeletePlanInput>
};


export type MutationCreateTagArgs = {
  input?: Maybe<CreateTagInput>
};


export type MutationUpdateTagArgs = {
  input?: Maybe<UpdateTagInput>
};


export type MutationDeleteTagArgs = {
  input?: Maybe<DeleteTagInput>
};


export type MutationCreateTermArgs = {
  input?: Maybe<CreateTermInput>
};


export type MutationUpdateTermArgs = {
  input?: Maybe<UpdateTermInput>
};


export type MutationDeleteTermArgs = {
  input?: Maybe<DeleteTermInput>
};


export type MutationDeleteFileArgs = {
  input?: Maybe<DeleteFileInput>
};


export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>
};


export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>
};


export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>
};


export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>
};


export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>
};


export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>
};


export type MutationUploadArgs = {
  refId?: Maybe<Scalars['ID']>,
  ref?: Maybe<Scalars['String']>,
  field?: Maybe<Scalars['String']>,
  source?: Maybe<Scalars['String']>,
  info?: Maybe<FileInfoInput>,
  file: Scalars['Upload']
};


export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars['ID']>,
  ref?: Maybe<Scalars['String']>,
  field?: Maybe<Scalars['String']>,
  source?: Maybe<Scalars['String']>,
  files: Array<Maybe<Scalars['Upload']>>
};


export type MutationUpdateFileInfoArgs = {
  id: Scalars['ID'],
  info: FileInfoInput
};


export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput
};


export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String']
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'],
  passwordConfirmation: Scalars['String'],
  code: Scalars['String']
};


export type MutationEmailConfirmationArgs = {
  confirmation: Scalars['String']
};


export type MutationUpdateMeArgs = {
  input?: Maybe<UpdateUserInput>
};


export type MutationTokenSignInArgs = {
  token: Scalars['String']
};


export type MutationUpdateMyCommentArgs = {
  input?: Maybe<UpdateCommentInput>
};


export type MutationEmailMeetingArgs = {
  input: EmailMeetingInput
};


export type MutationUpdateMyMeetingArgs = {
  input?: Maybe<UpdateMeetingInput>
};


export type MutationUpdateMyPlanArgs = {
  input?: Maybe<UpdatePlanInput>
};


export type MutationTagPlanArgs = {
  tags: Array<Scalars['String']>,
  planId: Scalars['ID']
};

export type Parser = {
  __typename?: 'Parser',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  for?: Maybe<Enum_Parser_For>,
  url?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Boolean']>,
  objectSelector?: Maybe<Scalars['String']>,
  sidMatch?: Maybe<Scalars['String']>,
  fields?: Maybe<Scalars['String']>,
  urlByExistingItem?: Maybe<Enum_Parser_Urlbyexistingitem>,
  method?: Maybe<Enum_Parser_Method>,
  requestParams?: Maybe<Scalars['String']>,
  fileFields?: Maybe<Scalars['String']>,
  isJson: Scalars['Boolean'],
};

export type ParserAggregator = {
  __typename?: 'ParserAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type ParserConnection = {
  __typename?: 'ParserConnection',
  values?: Maybe<Array<Maybe<Parser>>>,
  groupBy?: Maybe<ParserGroupBy>,
  aggregate?: Maybe<ParserAggregator>,
};

export type ParserConnection_Id = {
  __typename?: 'ParserConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionActive = {
  __typename?: 'ParserConnectionActive',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionCreatedAt = {
  __typename?: 'ParserConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionFields = {
  __typename?: 'ParserConnectionFields',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionFileFields = {
  __typename?: 'ParserConnectionFileFields',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionFor = {
  __typename?: 'ParserConnectionFor',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionId = {
  __typename?: 'ParserConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionIsJson = {
  __typename?: 'ParserConnectionIsJson',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionMethod = {
  __typename?: 'ParserConnectionMethod',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionObjectSelector = {
  __typename?: 'ParserConnectionObjectSelector',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionRequestParams = {
  __typename?: 'ParserConnectionRequestParams',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionSidMatch = {
  __typename?: 'ParserConnectionSidMatch',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionUpdatedAt = {
  __typename?: 'ParserConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionUrl = {
  __typename?: 'ParserConnectionUrl',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserConnectionUrlByExistingItem = {
  __typename?: 'ParserConnectionUrlByExistingItem',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<ParserConnection>,
};

export type ParserGroupBy = {
  __typename?: 'ParserGroupBy',
  id?: Maybe<Array<Maybe<ParserConnectionId>>>,
  _id?: Maybe<Array<Maybe<ParserConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<ParserConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<ParserConnectionUpdatedAt>>>,
  for?: Maybe<Array<Maybe<ParserConnectionFor>>>,
  url?: Maybe<Array<Maybe<ParserConnectionUrl>>>,
  active?: Maybe<Array<Maybe<ParserConnectionActive>>>,
  objectSelector?: Maybe<Array<Maybe<ParserConnectionObjectSelector>>>,
  sidMatch?: Maybe<Array<Maybe<ParserConnectionSidMatch>>>,
  fields?: Maybe<Array<Maybe<ParserConnectionFields>>>,
  urlByExistingItem?: Maybe<Array<Maybe<ParserConnectionUrlByExistingItem>>>,
  method?: Maybe<Array<Maybe<ParserConnectionMethod>>>,
  requestParams?: Maybe<Array<Maybe<ParserConnectionRequestParams>>>,
  fileFields?: Maybe<Array<Maybe<ParserConnectionFileFields>>>,
  isJson?: Maybe<Array<Maybe<ParserConnectionIsJson>>>,
};

export type ParserInput = {
  for?: Maybe<Enum_Parser_For>,
  url?: Maybe<Scalars['String']>,
  active?: Maybe<Scalars['Boolean']>,
  objectSelector?: Maybe<Scalars['String']>,
  sidMatch?: Maybe<Scalars['String']>,
  fields?: Maybe<Scalars['String']>,
  urlByExistingItem?: Maybe<Enum_Parser_Urlbyexistingitem>,
  method?: Maybe<Enum_Parser_Method>,
  requestParams?: Maybe<Scalars['String']>,
  fileFields?: Maybe<Scalars['String']>,
  isJson?: Maybe<Scalars['Boolean']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type Plan = {
  __typename?: 'Plan',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  lastUpdate?: Maybe<Scalars['DateTime']>,
  location?: Maybe<Scalars['String']>,
  municipality?: Maybe<Scalars['String']>,
  settlement?: Maybe<Scalars['String']>,
  sections?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  sid?: Maybe<Scalars['String']>,
  targets?: Maybe<Scalars['String']>,
  number?: Maybe<Scalars['String']>,
  submission?: Maybe<Scalars['DateTime']>,
  stype?: Maybe<Scalars['Int']>,
  addedManually?: Maybe<Scalars['Boolean']>,
  street?: Maybe<Scalars['String']>,
  houseNumber?: Maybe<Scalars['Int']>,
  commentsAreLocked?: Maybe<Scalars['Boolean']>,
  geometry?: Maybe<Scalars['JSON']>,
  attachedFiles?: Maybe<Array<Maybe<UploadFile>>>,
  meetings?: Maybe<Array<Maybe<Meeting>>>,
  comments?: Maybe<Array<Maybe<Comment>>>,
  tags?: Maybe<Array<Maybe<Tag>>>,
  municipalities?: Maybe<Array<Maybe<Municipality>>>,
};


export type PlanAttachedFilesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type PlanMeetingsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type PlanCommentsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type PlanTagsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type PlanMunicipalitiesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type PlanAggregator = {
  __typename?: 'PlanAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
  sum?: Maybe<PlanAggregatorSum>,
  avg?: Maybe<PlanAggregatorAvg>,
  min?: Maybe<PlanAggregatorMin>,
  max?: Maybe<PlanAggregatorMax>,
};

export type PlanAggregatorAvg = {
  __typename?: 'PlanAggregatorAvg',
  stype?: Maybe<Scalars['Float']>,
  houseNumber?: Maybe<Scalars['Float']>,
};

export type PlanAggregatorMax = {
  __typename?: 'PlanAggregatorMax',
  stype?: Maybe<Scalars['Float']>,
  houseNumber?: Maybe<Scalars['Float']>,
};

export type PlanAggregatorMin = {
  __typename?: 'PlanAggregatorMin',
  stype?: Maybe<Scalars['Float']>,
  houseNumber?: Maybe<Scalars['Float']>,
};

export type PlanAggregatorSum = {
  __typename?: 'PlanAggregatorSum',
  stype?: Maybe<Scalars['Float']>,
  houseNumber?: Maybe<Scalars['Float']>,
};

export type PlanConnection = {
  __typename?: 'PlanConnection',
  values?: Maybe<Array<Maybe<Plan>>>,
  groupBy?: Maybe<PlanGroupBy>,
  aggregate?: Maybe<PlanAggregator>,
};

export type PlanConnection_Id = {
  __typename?: 'PlanConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionAddedManually = {
  __typename?: 'PlanConnectionAddedManually',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionCommentsAreLocked = {
  __typename?: 'PlanConnectionCommentsAreLocked',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionCreatedAt = {
  __typename?: 'PlanConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionGeometry = {
  __typename?: 'PlanConnectionGeometry',
  key?: Maybe<Scalars['JSON']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionHouseNumber = {
  __typename?: 'PlanConnectionHouseNumber',
  key?: Maybe<Scalars['Int']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionId = {
  __typename?: 'PlanConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionLastUpdate = {
  __typename?: 'PlanConnectionLastUpdate',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionLocation = {
  __typename?: 'PlanConnectionLocation',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionMunicipality = {
  __typename?: 'PlanConnectionMunicipality',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionName = {
  __typename?: 'PlanConnectionName',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionNumber = {
  __typename?: 'PlanConnectionNumber',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionSections = {
  __typename?: 'PlanConnectionSections',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionSettlement = {
  __typename?: 'PlanConnectionSettlement',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionSid = {
  __typename?: 'PlanConnectionSid',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionStatus = {
  __typename?: 'PlanConnectionStatus',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionStreet = {
  __typename?: 'PlanConnectionStreet',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionStype = {
  __typename?: 'PlanConnectionStype',
  key?: Maybe<Scalars['Int']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionSubmission = {
  __typename?: 'PlanConnectionSubmission',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionTargets = {
  __typename?: 'PlanConnectionTargets',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionType = {
  __typename?: 'PlanConnectionType',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanConnectionUpdatedAt = {
  __typename?: 'PlanConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<PlanConnection>,
};

export type PlanGroupBy = {
  __typename?: 'PlanGroupBy',
  id?: Maybe<Array<Maybe<PlanConnectionId>>>,
  _id?: Maybe<Array<Maybe<PlanConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<PlanConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<PlanConnectionUpdatedAt>>>,
  name?: Maybe<Array<Maybe<PlanConnectionName>>>,
  status?: Maybe<Array<Maybe<PlanConnectionStatus>>>,
  lastUpdate?: Maybe<Array<Maybe<PlanConnectionLastUpdate>>>,
  location?: Maybe<Array<Maybe<PlanConnectionLocation>>>,
  municipality?: Maybe<Array<Maybe<PlanConnectionMunicipality>>>,
  settlement?: Maybe<Array<Maybe<PlanConnectionSettlement>>>,
  sections?: Maybe<Array<Maybe<PlanConnectionSections>>>,
  type?: Maybe<Array<Maybe<PlanConnectionType>>>,
  sid?: Maybe<Array<Maybe<PlanConnectionSid>>>,
  targets?: Maybe<Array<Maybe<PlanConnectionTargets>>>,
  number?: Maybe<Array<Maybe<PlanConnectionNumber>>>,
  submission?: Maybe<Array<Maybe<PlanConnectionSubmission>>>,
  stype?: Maybe<Array<Maybe<PlanConnectionStype>>>,
  addedManually?: Maybe<Array<Maybe<PlanConnectionAddedManually>>>,
  street?: Maybe<Array<Maybe<PlanConnectionStreet>>>,
  houseNumber?: Maybe<Array<Maybe<PlanConnectionHouseNumber>>>,
  commentsAreLocked?: Maybe<Array<Maybe<PlanConnectionCommentsAreLocked>>>,
  geometry?: Maybe<Array<Maybe<PlanConnectionGeometry>>>,
};

export type PlanInput = {
  name?: Maybe<Scalars['String']>,
  status?: Maybe<Scalars['String']>,
  lastUpdate?: Maybe<Scalars['DateTime']>,
  location?: Maybe<Scalars['String']>,
  municipality?: Maybe<Scalars['String']>,
  settlement?: Maybe<Scalars['String']>,
  sections?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  sid?: Maybe<Scalars['String']>,
  targets?: Maybe<Scalars['String']>,
  number?: Maybe<Scalars['String']>,
  submission?: Maybe<Scalars['DateTime']>,
  stype?: Maybe<Scalars['Int']>,
  addedManually?: Maybe<Scalars['Boolean']>,
  attachedFiles?: Maybe<Array<Maybe<Scalars['ID']>>>,
  street?: Maybe<Scalars['String']>,
  houseNumber?: Maybe<Scalars['Int']>,
  meetings?: Maybe<Array<Maybe<Scalars['ID']>>>,
  commentsAreLocked?: Maybe<Scalars['Boolean']>,
  comments?: Maybe<Array<Maybe<Scalars['ID']>>>,
  tags?: Maybe<Array<Maybe<Scalars['ID']>>>,
  municipalities?: Maybe<Array<Maybe<Scalars['ID']>>>,
  geometry?: Maybe<Scalars['JSON']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export enum PublicationState {
  Live = 'LIVE',
  Preview = 'PREVIEW'
}

export type Query = {
  __typename?: 'Query',
  area?: Maybe<Area>,
  areas?: Maybe<Array<Maybe<Area>>>,
  areasConnection?: Maybe<AreaConnection>,
  comment?: Maybe<Comment>,
  comments?: Maybe<Array<Maybe<Comment>>>,
  commentsConnection?: Maybe<CommentConnection>,
  committee?: Maybe<Committee>,
  committees?: Maybe<Array<Maybe<Committee>>>,
  committeesConnection?: Maybe<CommitteeConnection>,
  contactApplication?: Maybe<ContactApplications>,
  contactApplications?: Maybe<Array<Maybe<ContactApplications>>>,
  contactApplicationsConnection?: Maybe<ContactApplicationsConnection>,
  meeting?: Maybe<Meeting>,
  meetings?: Maybe<Array<Maybe<Meeting>>>,
  meetingsConnection?: Maybe<MeetingConnection>,
  municipality?: Maybe<Municipality>,
  municipalities?: Maybe<Array<Maybe<Municipality>>>,
  municipalitiesConnection?: Maybe<MunicipalityConnection>,
  parser?: Maybe<Parser>,
  parsers?: Maybe<Array<Maybe<Parser>>>,
  parsersConnection?: Maybe<ParserConnection>,
  plan?: Maybe<Plan>,
  plans?: Maybe<Array<Maybe<Plan>>>,
  plansConnection?: Maybe<PlanConnection>,
  tag?: Maybe<Tag>,
  tags?: Maybe<Array<Maybe<Tag>>>,
  tagsConnection?: Maybe<TagConnection>,
  term?: Maybe<Term>,
  terms?: Maybe<Array<Maybe<Term>>>,
  termsConnection?: Maybe<TermConnection>,
  files?: Maybe<Array<Maybe<UploadFile>>>,
  filesConnection?: Maybe<UploadFileConnection>,
  role?: Maybe<UsersPermissionsRole>,
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>,
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>,
  user?: Maybe<UsersPermissionsUser>,
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
  usersConnection?: Maybe<UsersPermissionsUserConnection>,
  me?: Maybe<UsersPermissionsMe>,
};


export type QueryAreaArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryAreasArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryAreasConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryCommentArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryCommentsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryCommentsConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryCommitteeArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryCommitteesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryCommitteesConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryContactApplicationArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryContactApplicationsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryContactApplicationsConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryMeetingArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryMeetingsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryMeetingsConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryMunicipalityArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryMunicipalitiesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryMunicipalitiesConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryParserArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryParsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryParsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryPlanArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryPlansArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryPlansConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryTagArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryTagsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryTagsConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryTermArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryTermsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryTermsConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryFilesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryRoleArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryRolesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type QueryUserArgs = {
  id: Scalars['ID'],
  publicationState?: Maybe<PublicationState>
};


export type QueryUsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>,
  publicationState?: Maybe<PublicationState>
};


export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type RoleInput = {
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  permissions?: Maybe<Array<Maybe<Scalars['ID']>>>,
  users?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type Tag = {
  __typename?: 'Tag',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  plans?: Maybe<Array<Maybe<Plan>>>,
  subscribedUsers?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
};


export type TagPlansArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type TagSubscribedUsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type TagAggregator = {
  __typename?: 'TagAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type TagConnection = {
  __typename?: 'TagConnection',
  values?: Maybe<Array<Maybe<Tag>>>,
  groupBy?: Maybe<TagGroupBy>,
  aggregate?: Maybe<TagAggregator>,
};

export type TagConnection_Id = {
  __typename?: 'TagConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<TagConnection>,
};

export type TagConnectionCreatedAt = {
  __typename?: 'TagConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<TagConnection>,
};

export type TagConnectionId = {
  __typename?: 'TagConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<TagConnection>,
};

export type TagConnectionName = {
  __typename?: 'TagConnectionName',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<TagConnection>,
};

export type TagConnectionUpdatedAt = {
  __typename?: 'TagConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<TagConnection>,
};

export type TagGroupBy = {
  __typename?: 'TagGroupBy',
  id?: Maybe<Array<Maybe<TagConnectionId>>>,
  _id?: Maybe<Array<Maybe<TagConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<TagConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<TagConnectionUpdatedAt>>>,
  name?: Maybe<Array<Maybe<TagConnectionName>>>,
};

export type TagInput = {
  name: Scalars['String'],
  plans?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedUsers?: Maybe<Array<Maybe<Scalars['ID']>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type Term = {
  __typename?: 'Term',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  phrase?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  published_at?: Maybe<Scalars['DateTime']>,
};

export type TermAggregator = {
  __typename?: 'TermAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type TermConnection = {
  __typename?: 'TermConnection',
  values?: Maybe<Array<Maybe<Term>>>,
  groupBy?: Maybe<TermGroupBy>,
  aggregate?: Maybe<TermAggregator>,
};

export type TermConnection_Id = {
  __typename?: 'TermConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<TermConnection>,
};

export type TermConnectionCreatedAt = {
  __typename?: 'TermConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<TermConnection>,
};

export type TermConnectionDescription = {
  __typename?: 'TermConnectionDescription',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<TermConnection>,
};

export type TermConnectionId = {
  __typename?: 'TermConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<TermConnection>,
};

export type TermConnectionPhrase = {
  __typename?: 'TermConnectionPhrase',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<TermConnection>,
};

export type TermConnectionPublished_At = {
  __typename?: 'TermConnectionPublished_at',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<TermConnection>,
};

export type TermConnectionUpdatedAt = {
  __typename?: 'TermConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<TermConnection>,
};

export type TermGroupBy = {
  __typename?: 'TermGroupBy',
  id?: Maybe<Array<Maybe<TermConnectionId>>>,
  _id?: Maybe<Array<Maybe<TermConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<TermConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<TermConnectionUpdatedAt>>>,
  phrase?: Maybe<Array<Maybe<TermConnectionPhrase>>>,
  description?: Maybe<Array<Maybe<TermConnectionDescription>>>,
  published_at?: Maybe<Array<Maybe<TermConnectionPublished_At>>>,
};

export type TermInput = {
  phrase?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  published_at?: Maybe<Scalars['DateTime']>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};


export type UpdateAreaInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditAreaInput>,
};

export type UpdateAreaPayload = {
  __typename?: 'updateAreaPayload',
  area?: Maybe<Area>,
};

export type UpdateCommentInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditCommentInput>,
};

export type UpdateCommentPayload = {
  __typename?: 'updateCommentPayload',
  comment?: Maybe<Comment>,
};

export type UpdateCommitteeInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditCommitteeInput>,
};

export type UpdateCommitteePayload = {
  __typename?: 'updateCommitteePayload',
  committee?: Maybe<Committee>,
};

export type UpdateContactApplicationInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditContactApplicationInput>,
};

export type UpdateContactApplicationPayload = {
  __typename?: 'updateContactApplicationPayload',
  contactApplication?: Maybe<ContactApplications>,
};

export type UpdateMeetingInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditMeetingInput>,
};

export type UpdateMeetingPayload = {
  __typename?: 'updateMeetingPayload',
  meeting?: Maybe<Meeting>,
};

export type UpdateMunicipalityInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditMunicipalityInput>,
};

export type UpdateMunicipalityPayload = {
  __typename?: 'updateMunicipalityPayload',
  municipality?: Maybe<Municipality>,
};

export type UpdateParserInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditParserInput>,
};

export type UpdateParserPayload = {
  __typename?: 'updateParserPayload',
  parser?: Maybe<Parser>,
};

export type UpdatePlanInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditPlanInput>,
};

export type UpdatePlanPayload = {
  __typename?: 'updatePlanPayload',
  plan?: Maybe<Plan>,
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditRoleInput>,
};

export type UpdateRolePayload = {
  __typename?: 'updateRolePayload',
  role?: Maybe<UsersPermissionsRole>,
};

export type UpdateTagInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditTagInput>,
};

export type UpdateTagPayload = {
  __typename?: 'updateTagPayload',
  tag?: Maybe<Tag>,
};

export type UpdateTermInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditTermInput>,
};

export type UpdateTermPayload = {
  __typename?: 'updateTermPayload',
  term?: Maybe<Term>,
};

export type UpdateUserInput = {
  where?: Maybe<InputId>,
  data?: Maybe<EditUserInput>,
};

export type UpdateUserPayload = {
  __typename?: 'updateUserPayload',
  user?: Maybe<UsersPermissionsUser>,
};


export type UploadFile = {
  __typename?: 'UploadFile',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  alternativeText?: Maybe<Scalars['String']>,
  caption?: Maybe<Scalars['String']>,
  width?: Maybe<Scalars['Int']>,
  height?: Maybe<Scalars['Int']>,
  formats?: Maybe<Scalars['JSON']>,
  hash: Scalars['String'],
  ext?: Maybe<Scalars['String']>,
  mime: Scalars['String'],
  size: Scalars['Float'],
  url: Scalars['String'],
  previewUrl?: Maybe<Scalars['String']>,
  provider: Scalars['String'],
  provider_metadata?: Maybe<Scalars['JSON']>,
  related?: Maybe<Array<Maybe<Morph>>>,
};


export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type UploadFileAggregator = {
  __typename?: 'UploadFileAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
  sum?: Maybe<UploadFileAggregatorSum>,
  avg?: Maybe<UploadFileAggregatorAvg>,
  min?: Maybe<UploadFileAggregatorMin>,
  max?: Maybe<UploadFileAggregatorMax>,
};

export type UploadFileAggregatorAvg = {
  __typename?: 'UploadFileAggregatorAvg',
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  size?: Maybe<Scalars['Float']>,
};

export type UploadFileAggregatorMax = {
  __typename?: 'UploadFileAggregatorMax',
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  size?: Maybe<Scalars['Float']>,
};

export type UploadFileAggregatorMin = {
  __typename?: 'UploadFileAggregatorMin',
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  size?: Maybe<Scalars['Float']>,
};

export type UploadFileAggregatorSum = {
  __typename?: 'UploadFileAggregatorSum',
  width?: Maybe<Scalars['Float']>,
  height?: Maybe<Scalars['Float']>,
  size?: Maybe<Scalars['Float']>,
};

export type UploadFileConnection = {
  __typename?: 'UploadFileConnection',
  values?: Maybe<Array<Maybe<UploadFile>>>,
  groupBy?: Maybe<UploadFileGroupBy>,
  aggregate?: Maybe<UploadFileAggregator>,
};

export type UploadFileConnection_Id = {
  __typename?: 'UploadFileConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionAlternativeText = {
  __typename?: 'UploadFileConnectionAlternativeText',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionCaption = {
  __typename?: 'UploadFileConnectionCaption',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionCreatedAt = {
  __typename?: 'UploadFileConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionExt = {
  __typename?: 'UploadFileConnectionExt',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionFormats = {
  __typename?: 'UploadFileConnectionFormats',
  key?: Maybe<Scalars['JSON']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionHash = {
  __typename?: 'UploadFileConnectionHash',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionHeight = {
  __typename?: 'UploadFileConnectionHeight',
  key?: Maybe<Scalars['Int']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionId = {
  __typename?: 'UploadFileConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionMime = {
  __typename?: 'UploadFileConnectionMime',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionName = {
  __typename?: 'UploadFileConnectionName',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionPreviewUrl = {
  __typename?: 'UploadFileConnectionPreviewUrl',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionProvider = {
  __typename?: 'UploadFileConnectionProvider',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: 'UploadFileConnectionProvider_metadata',
  key?: Maybe<Scalars['JSON']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionSize = {
  __typename?: 'UploadFileConnectionSize',
  key?: Maybe<Scalars['Float']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionUpdatedAt = {
  __typename?: 'UploadFileConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionUrl = {
  __typename?: 'UploadFileConnectionUrl',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileConnectionWidth = {
  __typename?: 'UploadFileConnectionWidth',
  key?: Maybe<Scalars['Int']>,
  connection?: Maybe<UploadFileConnection>,
};

export type UploadFileGroupBy = {
  __typename?: 'UploadFileGroupBy',
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>,
  _id?: Maybe<Array<Maybe<UploadFileConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<UploadFileConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<UploadFileConnectionUpdatedAt>>>,
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>,
  alternativeText?: Maybe<Array<Maybe<UploadFileConnectionAlternativeText>>>,
  caption?: Maybe<Array<Maybe<UploadFileConnectionCaption>>>,
  width?: Maybe<Array<Maybe<UploadFileConnectionWidth>>>,
  height?: Maybe<Array<Maybe<UploadFileConnectionHeight>>>,
  formats?: Maybe<Array<Maybe<UploadFileConnectionFormats>>>,
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>,
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>,
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>,
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>,
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>,
  previewUrl?: Maybe<Array<Maybe<UploadFileConnectionPreviewUrl>>>,
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>,
  provider_metadata?: Maybe<Array<Maybe<UploadFileConnectionProvider_Metadata>>>,
};

export type UserInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  provider?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  resetPasswordToken?: Maybe<Scalars['String']>,
  confirmed?: Maybe<Scalars['Boolean']>,
  blocked?: Maybe<Scalars['Boolean']>,
  confirmationToken?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['ID']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  city?: Maybe<Scalars['String']>,
  organization?: Maybe<Scalars['String']>,
  job?: Maybe<Scalars['String']>,
  userImage?: Maybe<Scalars['ID']>,
  committees?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedCommittees?: Maybe<Array<Maybe<Scalars['ID']>>>,
  comments?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedTags?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedMunicipalities?: Maybe<Array<Maybe<Scalars['ID']>>>,
  subscribedLocations?: Maybe<Array<Maybe<ComponentMiscLocationInput>>>,
  created_by?: Maybe<Scalars['ID']>,
  updated_by?: Maybe<Scalars['ID']>,
};

export type UserPermissionsPasswordPayload = {
  __typename?: 'UserPermissionsPasswordPayload',
  ok: Scalars['Boolean'],
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars['String'],
  password: Scalars['String'],
  provider?: Maybe<Scalars['String']>,
};

export type UsersPermissionsLoginPayload = {
  __typename?: 'UsersPermissionsLoginPayload',
  jwt?: Maybe<Scalars['String']>,
  user: UsersPermissionsMe,
};

export type UsersPermissionsMe = {
  __typename?: 'UsersPermissionsMe',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  confirmed?: Maybe<Scalars['Boolean']>,
  blocked?: Maybe<Scalars['Boolean']>,
  role?: Maybe<UsersPermissionsMeRole>,
};

export type UsersPermissionsMeRole = {
  __typename?: 'UsersPermissionsMeRole',
  id: Scalars['ID'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type UsersPermissionsPermission = {
  __typename?: 'UsersPermissionsPermission',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  type: Scalars['String'],
  controller: Scalars['String'],
  action: Scalars['String'],
  enabled: Scalars['Boolean'],
  policy?: Maybe<Scalars['String']>,
  role?: Maybe<UsersPermissionsRole>,
};

export type UsersPermissionsRegisterInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type UsersPermissionsRole = {
  __typename?: 'UsersPermissionsRole',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  name: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>,
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
};


export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type UsersPermissionsRoleAggregator = {
  __typename?: 'UsersPermissionsRoleAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type UsersPermissionsRoleConnection = {
  __typename?: 'UsersPermissionsRoleConnection',
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>,
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>,
  aggregate?: Maybe<UsersPermissionsRoleAggregator>,
};

export type UsersPermissionsRoleConnection_Id = {
  __typename?: 'UsersPermissionsRoleConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<UsersPermissionsRoleConnection>,
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: 'UsersPermissionsRoleConnectionDescription',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsRoleConnection>,
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: 'UsersPermissionsRoleConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<UsersPermissionsRoleConnection>,
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: 'UsersPermissionsRoleConnectionName',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsRoleConnection>,
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: 'UsersPermissionsRoleConnectionType',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsRoleConnection>,
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: 'UsersPermissionsRoleGroupBy',
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>,
  _id?: Maybe<Array<Maybe<UsersPermissionsRoleConnection_Id>>>,
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>,
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>,
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>,
};

export type UsersPermissionsUser = {
  __typename?: 'UsersPermissionsUser',
  id: Scalars['ID'],
  _id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  username: Scalars['String'],
  email: Scalars['String'],
  provider?: Maybe<Scalars['String']>,
  confirmed?: Maybe<Scalars['Boolean']>,
  blocked?: Maybe<Scalars['Boolean']>,
  role?: Maybe<UsersPermissionsRole>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  city?: Maybe<Scalars['String']>,
  organization?: Maybe<Scalars['String']>,
  job?: Maybe<Scalars['String']>,
  userImage?: Maybe<UploadFile>,
  subscribedLocations?: Maybe<Array<Maybe<ComponentMiscLocation>>>,
  committees?: Maybe<Array<Maybe<Committee>>>,
  subscribedCommittees?: Maybe<Array<Maybe<Committee>>>,
  comments?: Maybe<Array<Maybe<Comment>>>,
  subscribedTags?: Maybe<Array<Maybe<Tag>>>,
  subscribedMunicipalities?: Maybe<Array<Maybe<Municipality>>>,
};


export type UsersPermissionsUserCommitteesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type UsersPermissionsUserSubscribedCommitteesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type UsersPermissionsUserCommentsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type UsersPermissionsUserSubscribedTagsArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};


export type UsersPermissionsUserSubscribedMunicipalitiesArgs = {
  sort?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  start?: Maybe<Scalars['Int']>,
  where?: Maybe<Scalars['JSON']>
};

export type UsersPermissionsUserAggregator = {
  __typename?: 'UsersPermissionsUserAggregator',
  count?: Maybe<Scalars['Int']>,
  totalCount?: Maybe<Scalars['Int']>,
};

export type UsersPermissionsUserConnection = {
  __typename?: 'UsersPermissionsUserConnection',
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>,
  groupBy?: Maybe<UsersPermissionsUserGroupBy>,
  aggregate?: Maybe<UsersPermissionsUserAggregator>,
};

export type UsersPermissionsUserConnection_Id = {
  __typename?: 'UsersPermissionsUserConnection_id',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: 'UsersPermissionsUserConnectionBlocked',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionCity = {
  __typename?: 'UsersPermissionsUserConnectionCity',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: 'UsersPermissionsUserConnectionConfirmed',
  key?: Maybe<Scalars['Boolean']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionCreatedAt = {
  __typename?: 'UsersPermissionsUserConnectionCreatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: 'UsersPermissionsUserConnectionEmail',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionFirstName = {
  __typename?: 'UsersPermissionsUserConnectionFirstName',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionId = {
  __typename?: 'UsersPermissionsUserConnectionId',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionJob = {
  __typename?: 'UsersPermissionsUserConnectionJob',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionLastName = {
  __typename?: 'UsersPermissionsUserConnectionLastName',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionOrganization = {
  __typename?: 'UsersPermissionsUserConnectionOrganization',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: 'UsersPermissionsUserConnectionProvider',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: 'UsersPermissionsUserConnectionRole',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionUpdatedAt = {
  __typename?: 'UsersPermissionsUserConnectionUpdatedAt',
  key?: Maybe<Scalars['DateTime']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionUserImage = {
  __typename?: 'UsersPermissionsUserConnectionUserImage',
  key?: Maybe<Scalars['ID']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: 'UsersPermissionsUserConnectionUsername',
  key?: Maybe<Scalars['String']>,
  connection?: Maybe<UsersPermissionsUserConnection>,
};

export type UsersPermissionsUserGroupBy = {
  __typename?: 'UsersPermissionsUserGroupBy',
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>,
  _id?: Maybe<Array<Maybe<UsersPermissionsUserConnection_Id>>>,
  createdAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreatedAt>>>,
  updatedAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdatedAt>>>,
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>,
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>,
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>,
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>,
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>,
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>,
  firstName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionFirstName>>>,
  lastName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionLastName>>>,
  city?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCity>>>,
  organization?: Maybe<Array<Maybe<UsersPermissionsUserConnectionOrganization>>>,
  job?: Maybe<Array<Maybe<UsersPermissionsUserConnectionJob>>>,
  userImage?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUserImage>>>,
};
