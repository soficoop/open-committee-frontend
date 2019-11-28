export type Maybe<T> = T | null;
export type MaybePromise<T> = Promise<T> | T;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  /** The `DateTime` scalar represents a date and time following the ISO 8601 standard */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
  /** The `Long` scalar type represents 52-bit integers */
  Long: any;
};

export type Area = {
  __typename?: "Area";
  sid: Scalars["String"];
  committees?: Maybe<Array<Maybe<Committee>>>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type AreaCommitteesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type AreaAggregator = {
  __typename?: "AreaAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AreaConnection = {
  __typename?: "AreaConnection";
  values?: Maybe<Array<Maybe<Area>>>;
  groupBy?: Maybe<AreaGroupBy>;
  aggregate?: Maybe<AreaAggregator>;
};

export type AreaConnection_Id = {
  __typename?: "AreaConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<AreaConnection>;
};

export type AreaConnectionCreatedAt = {
  __typename?: "AreaConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<AreaConnection>;
};

export type AreaConnectionId = {
  __typename?: "AreaConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<AreaConnection>;
};

export type AreaConnectionSid = {
  __typename?: "AreaConnectionSid";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<AreaConnection>;
};

export type AreaConnectionUpdatedAt = {
  __typename?: "AreaConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<AreaConnection>;
};

export type AreaGroupBy = {
  __typename?: "AreaGroupBy";
  sid?: Maybe<Array<Maybe<AreaConnectionSid>>>;
  _id?: Maybe<Array<Maybe<AreaConnection_Id>>>;
  id?: Maybe<Array<Maybe<AreaConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<AreaConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<AreaConnectionUpdatedAt>>>;
};

export type AreaInput = {
  sid: Scalars["String"];
  committees?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export enum CacheControlScope {
  Public = "PUBLIC",
  Private = "PRIVATE"
}

/** Comments on other content types */
export type Comment = {
  __typename?: "Comment";
  title?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  parent?: Maybe<Comment>;
  user?: Maybe<UsersPermissionsUser>;
  isHidden?: Maybe<Scalars["Boolean"]>;
  isPinned?: Maybe<Scalars["Boolean"]>;
  plan?: Maybe<Plan>;
  children?: Maybe<Array<Maybe<Comment>>>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  updatedAt: Scalars["DateTime"];
};

/** Comments on other content types */
export type CommentChildrenArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

/** Comments on other content types */
export type CommentFilesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type CommentAggregator = {
  __typename?: "CommentAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type CommentConnection = {
  __typename?: "CommentConnection";
  values?: Maybe<Array<Maybe<Comment>>>;
  groupBy?: Maybe<CommentGroupBy>;
  aggregate?: Maybe<CommentAggregator>;
};

export type CommentConnection_Id = {
  __typename?: "CommentConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionContent = {
  __typename?: "CommentConnectionContent";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionCreatedAt = {
  __typename?: "CommentConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionId = {
  __typename?: "CommentConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionIsHidden = {
  __typename?: "CommentConnectionIsHidden";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionIsPinned = {
  __typename?: "CommentConnectionIsPinned";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionName = {
  __typename?: "CommentConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionParent = {
  __typename?: "CommentConnectionParent";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionPlan = {
  __typename?: "CommentConnectionPlan";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionTitle = {
  __typename?: "CommentConnectionTitle";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionUpdatedAt = {
  __typename?: "CommentConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentConnectionUser = {
  __typename?: "CommentConnectionUser";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommentConnection>;
};

export type CommentGroupBy = {
  __typename?: "CommentGroupBy";
  title?: Maybe<Array<Maybe<CommentConnectionTitle>>>;
  name?: Maybe<Array<Maybe<CommentConnectionName>>>;
  content?: Maybe<Array<Maybe<CommentConnectionContent>>>;
  createdAt?: Maybe<Array<Maybe<CommentConnectionCreatedAt>>>;
  parent?: Maybe<Array<Maybe<CommentConnectionParent>>>;
  user?: Maybe<Array<Maybe<CommentConnectionUser>>>;
  isHidden?: Maybe<Array<Maybe<CommentConnectionIsHidden>>>;
  isPinned?: Maybe<Array<Maybe<CommentConnectionIsPinned>>>;
  plan?: Maybe<Array<Maybe<CommentConnectionPlan>>>;
  _id?: Maybe<Array<Maybe<CommentConnection_Id>>>;
  id?: Maybe<Array<Maybe<CommentConnectionId>>>;
  updatedAt?: Maybe<Array<Maybe<CommentConnectionUpdatedAt>>>;
};

export type CommentInput = {
  title?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  parent?: Maybe<Scalars["ID"]>;
  children?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  user?: Maybe<Scalars["ID"]>;
  isHidden?: Maybe<Scalars["Boolean"]>;
  isPinned?: Maybe<Scalars["Boolean"]>;
  plan?: Maybe<Scalars["ID"]>;
  files?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type Committee = {
  __typename?: "Committee";
  sid: Scalars["String"];
  parent?: Maybe<Committee>;
  area?: Maybe<Area>;
  isHidden?: Maybe<Scalars["Boolean"]>;
  children?: Maybe<Array<Maybe<Committee>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  subscribedUsers?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type CommitteeChildrenArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type CommitteeUsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type CommitteeSubscribedUsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type CommitteeMeetingsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type CommitteeAggregator = {
  __typename?: "CommitteeAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type CommitteeConnection = {
  __typename?: "CommitteeConnection";
  values?: Maybe<Array<Maybe<Committee>>>;
  groupBy?: Maybe<CommitteeGroupBy>;
  aggregate?: Maybe<CommitteeAggregator>;
};

export type CommitteeConnection_Id = {
  __typename?: "CommitteeConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionArea = {
  __typename?: "CommitteeConnectionArea";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionCreatedAt = {
  __typename?: "CommitteeConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionId = {
  __typename?: "CommitteeConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionIsHidden = {
  __typename?: "CommitteeConnectionIsHidden";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionParent = {
  __typename?: "CommitteeConnectionParent";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionSid = {
  __typename?: "CommitteeConnectionSid";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeConnectionUpdatedAt = {
  __typename?: "CommitteeConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<CommitteeConnection>;
};

export type CommitteeGroupBy = {
  __typename?: "CommitteeGroupBy";
  sid?: Maybe<Array<Maybe<CommitteeConnectionSid>>>;
  parent?: Maybe<Array<Maybe<CommitteeConnectionParent>>>;
  area?: Maybe<Array<Maybe<CommitteeConnectionArea>>>;
  isHidden?: Maybe<Array<Maybe<CommitteeConnectionIsHidden>>>;
  _id?: Maybe<Array<Maybe<CommitteeConnection_Id>>>;
  id?: Maybe<Array<Maybe<CommitteeConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<CommitteeConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<CommitteeConnectionUpdatedAt>>>;
};

export type CommitteeInput = {
  sid: Scalars["String"];
  parent?: Maybe<Scalars["ID"]>;
  area?: Maybe<Scalars["ID"]>;
  children?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  users?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  subscribedUsers?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  meetings?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  isHidden?: Maybe<Scalars["Boolean"]>;
};

export type CreateAreaInput = {
  data?: Maybe<AreaInput>;
};

export type CreateAreaPayload = {
  __typename?: "createAreaPayload";
  area?: Maybe<Area>;
};

export type CreateCommentInput = {
  data?: Maybe<CommentInput>;
};

export type CreateCommentPayload = {
  __typename?: "createCommentPayload";
  comment?: Maybe<Comment>;
};

export type CreateCommitteeInput = {
  data?: Maybe<CommitteeInput>;
};

export type CreateCommitteePayload = {
  __typename?: "createCommitteePayload";
  committee?: Maybe<Committee>;
};

export type CreateMeetingInput = {
  data?: Maybe<MeetingInput>;
};

export type CreateMeetingPayload = {
  __typename?: "createMeetingPayload";
  meeting?: Maybe<Meeting>;
};

export type CreateParserInput = {
  data?: Maybe<ParserInput>;
};

export type CreateParserPayload = {
  __typename?: "createParserPayload";
  parser?: Maybe<Parser>;
};

export type CreatePlanInput = {
  data?: Maybe<PlanInput>;
};

export type CreatePlanPayload = {
  __typename?: "createPlanPayload";
  plan?: Maybe<Plan>;
};

export type CreateRoleInput = {
  data?: Maybe<RoleInput>;
};

export type CreateRolePayload = {
  __typename?: "createRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type CreateUserInput = {
  data?: Maybe<UserInput>;
};

export type CreateUserPayload = {
  __typename?: "createUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type DeleteAreaInput = {
  where?: Maybe<InputId>;
};

export type DeleteAreaPayload = {
  __typename?: "deleteAreaPayload";
  area?: Maybe<Area>;
};

export type DeleteCommentInput = {
  where?: Maybe<InputId>;
};

export type DeleteCommentPayload = {
  __typename?: "deleteCommentPayload";
  comment?: Maybe<Comment>;
};

export type DeleteCommitteeInput = {
  where?: Maybe<InputId>;
};

export type DeleteCommitteePayload = {
  __typename?: "deleteCommitteePayload";
  committee?: Maybe<Committee>;
};

export type DeleteMeetingInput = {
  where?: Maybe<InputId>;
};

export type DeleteMeetingPayload = {
  __typename?: "deleteMeetingPayload";
  meeting?: Maybe<Meeting>;
};

export type DeleteParserInput = {
  where?: Maybe<InputId>;
};

export type DeleteParserPayload = {
  __typename?: "deleteParserPayload";
  parser?: Maybe<Parser>;
};

export type DeletePlanInput = {
  where?: Maybe<InputId>;
};

export type DeletePlanPayload = {
  __typename?: "deletePlanPayload";
  plan?: Maybe<Plan>;
};

export type DeleteRoleInput = {
  where?: Maybe<InputId>;
};

export type DeleteRolePayload = {
  __typename?: "deleteRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type DeleteUserInput = {
  where?: Maybe<InputId>;
};

export type DeleteUserPayload = {
  __typename?: "deleteUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type EditAreaInput = {
  sid?: Maybe<Scalars["String"]>;
  committees?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type EditCommentInput = {
  title?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  parent?: Maybe<Scalars["ID"]>;
  children?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  user?: Maybe<Scalars["ID"]>;
  isHidden?: Maybe<Scalars["Boolean"]>;
  isPinned?: Maybe<Scalars["Boolean"]>;
  plan?: Maybe<Scalars["ID"]>;
  files?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type EditCommitteeInput = {
  sid?: Maybe<Scalars["String"]>;
  parent?: Maybe<Scalars["ID"]>;
  area?: Maybe<Scalars["ID"]>;
  children?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  users?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  subscribedUsers?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  meetings?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  isHidden?: Maybe<Scalars["Boolean"]>;
};

export type EditFileInput = {
  name?: Maybe<Scalars["String"]>;
  hash?: Maybe<Scalars["String"]>;
  sha256?: Maybe<Scalars["String"]>;
  ext?: Maybe<Scalars["String"]>;
  mime?: Maybe<Scalars["String"]>;
  size?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type EditMeetingInput = {
  date?: Maybe<Scalars["DateTime"]>;
  number?: Maybe<Scalars["Int"]>;
  decisions?: Maybe<Scalars["ID"]>;
  protocol?: Maybe<Scalars["ID"]>;
  transcript?: Maybe<Scalars["ID"]>;
  sid?: Maybe<Scalars["String"]>;
  addedManually?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  additionalFiles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  background?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  emailViews?: Maybe<Scalars["Int"]>;
  isHidden?: Maybe<Scalars["Boolean"]>;
  plans?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  committee?: Maybe<Scalars["ID"]>;
};

export type EditParserInput = {
  for?: Maybe<Enum_Parser_For>;
  url?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
  objectSelector?: Maybe<Scalars["String"]>;
  sidMatch?: Maybe<Scalars["String"]>;
  fields?: Maybe<Scalars["String"]>;
  urlByExistingItem?: Maybe<Enum_Parser_Urlbyexistingitem>;
  method?: Maybe<Enum_Parser_Method>;
  requestParams?: Maybe<Scalars["String"]>;
  runInterval?: Maybe<Enum_Parser_Runinterval>;
  fileFields?: Maybe<Scalars["String"]>;
};

export type EditPlanInput = {
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  lastUpdate?: Maybe<Scalars["DateTime"]>;
  location?: Maybe<Scalars["String"]>;
  municipality?: Maybe<Scalars["String"]>;
  settlement?: Maybe<Scalars["String"]>;
  sections?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  sid?: Maybe<Scalars["String"]>;
  targets?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["String"]>;
  submission?: Maybe<Scalars["DateTime"]>;
  stype?: Maybe<Scalars["Int"]>;
  addedManually?: Maybe<Scalars["Boolean"]>;
  attachedFiles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  street?: Maybe<Scalars["String"]>;
  houseNumber?: Maybe<Scalars["Int"]>;
  meetings?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  commentsAreLocked?: Maybe<Scalars["Boolean"]>;
  comments?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type EditRoleInput = {
  name?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  users?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type EditUserInput = {
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  provider?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  resetPasswordToken?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<Scalars["ID"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  organization?: Maybe<Scalars["String"]>;
  job?: Maybe<Scalars["String"]>;
  userImage?: Maybe<Scalars["ID"]>;
  committees?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  subscribedCommittees?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  comments?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type EmailMeetingInput = {
  where: InputId;
};

export type EmailMeetingPayload = {
  __typename?: "emailMeetingPayload";
  meeting?: Maybe<Meeting>;
  recipients?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
};

export enum Enum_Parser_For {
  Area = "area",
  Committee = "committee",
  Meeting = "meeting",
  Plan = "plan"
}

export enum Enum_Parser_Method {
  Get = "get",
  Post = "post"
}

export enum Enum_Parser_Runinterval {
  On = "On",
  Server = "server",
  Startup = "startup",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly"
}

export enum Enum_Parser_Urlbyexistingitem {
  None = "none",
  Area = "area",
  Committee = "committee",
  Meeting = "meeting",
  Plan = "plan"
}

export type FileInput = {
  name: Scalars["String"];
  hash: Scalars["String"];
  sha256?: Maybe<Scalars["String"]>;
  ext?: Maybe<Scalars["String"]>;
  mime: Scalars["String"];
  size: Scalars["String"];
  url: Scalars["String"];
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type InputId = {
  id: Scalars["ID"];
};

export type Meeting = {
  __typename?: "Meeting";
  date?: Maybe<Scalars["DateTime"]>;
  number?: Maybe<Scalars["Int"]>;
  decisions?: Maybe<UploadFile>;
  protocol?: Maybe<UploadFile>;
  transcript?: Maybe<UploadFile>;
  sid?: Maybe<Scalars["String"]>;
  addedManually?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  background?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  emailViews?: Maybe<Scalars["Int"]>;
  isHidden?: Maybe<Scalars["Boolean"]>;
  committee?: Maybe<Committee>;
  additionalFiles?: Maybe<Array<Maybe<UploadFile>>>;
  plans?: Maybe<Array<Maybe<Plan>>>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type MeetingAdditionalFilesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type MeetingPlansArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type MeetingAggregator = {
  __typename?: "MeetingAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
  sum?: Maybe<MeetingAggregatorSum>;
  avg?: Maybe<MeetingAggregatorAvg>;
  min?: Maybe<MeetingAggregatorMin>;
  max?: Maybe<MeetingAggregatorMax>;
};

export type MeetingAggregatorAvg = {
  __typename?: "MeetingAggregatorAvg";
  number?: Maybe<Scalars["Float"]>;
  emailViews?: Maybe<Scalars["Float"]>;
};

export type MeetingAggregatorMax = {
  __typename?: "MeetingAggregatorMax";
  number?: Maybe<Scalars["Float"]>;
  emailViews?: Maybe<Scalars["Float"]>;
};

export type MeetingAggregatorMin = {
  __typename?: "MeetingAggregatorMin";
  number?: Maybe<Scalars["Float"]>;
  emailViews?: Maybe<Scalars["Float"]>;
};

export type MeetingAggregatorSum = {
  __typename?: "MeetingAggregatorSum";
  number?: Maybe<Scalars["Float"]>;
  emailViews?: Maybe<Scalars["Float"]>;
};

export type MeetingConnection = {
  __typename?: "MeetingConnection";
  values?: Maybe<Array<Maybe<Meeting>>>;
  groupBy?: Maybe<MeetingGroupBy>;
  aggregate?: Maybe<MeetingAggregator>;
};

export type MeetingConnection_Id = {
  __typename?: "MeetingConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionAddedManually = {
  __typename?: "MeetingConnectionAddedManually";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionBackground = {
  __typename?: "MeetingConnectionBackground";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionCommittee = {
  __typename?: "MeetingConnectionCommittee";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionCreatedAt = {
  __typename?: "MeetingConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionDate = {
  __typename?: "MeetingConnectionDate";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionDecisions = {
  __typename?: "MeetingConnectionDecisions";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionEmailViews = {
  __typename?: "MeetingConnectionEmailViews";
  key?: Maybe<Scalars["Int"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionId = {
  __typename?: "MeetingConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionIsHidden = {
  __typename?: "MeetingConnectionIsHidden";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionNumber = {
  __typename?: "MeetingConnectionNumber";
  key?: Maybe<Scalars["Int"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionProtocol = {
  __typename?: "MeetingConnectionProtocol";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionSid = {
  __typename?: "MeetingConnectionSid";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionSummary = {
  __typename?: "MeetingConnectionSummary";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionTitle = {
  __typename?: "MeetingConnectionTitle";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionTranscript = {
  __typename?: "MeetingConnectionTranscript";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingConnectionUpdatedAt = {
  __typename?: "MeetingConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<MeetingConnection>;
};

export type MeetingGroupBy = {
  __typename?: "MeetingGroupBy";
  date?: Maybe<Array<Maybe<MeetingConnectionDate>>>;
  number?: Maybe<Array<Maybe<MeetingConnectionNumber>>>;
  decisions?: Maybe<Array<Maybe<MeetingConnectionDecisions>>>;
  protocol?: Maybe<Array<Maybe<MeetingConnectionProtocol>>>;
  transcript?: Maybe<Array<Maybe<MeetingConnectionTranscript>>>;
  sid?: Maybe<Array<Maybe<MeetingConnectionSid>>>;
  addedManually?: Maybe<Array<Maybe<MeetingConnectionAddedManually>>>;
  title?: Maybe<Array<Maybe<MeetingConnectionTitle>>>;
  background?: Maybe<Array<Maybe<MeetingConnectionBackground>>>;
  summary?: Maybe<Array<Maybe<MeetingConnectionSummary>>>;
  emailViews?: Maybe<Array<Maybe<MeetingConnectionEmailViews>>>;
  isHidden?: Maybe<Array<Maybe<MeetingConnectionIsHidden>>>;
  committee?: Maybe<Array<Maybe<MeetingConnectionCommittee>>>;
  _id?: Maybe<Array<Maybe<MeetingConnection_Id>>>;
  id?: Maybe<Array<Maybe<MeetingConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<MeetingConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<MeetingConnectionUpdatedAt>>>;
};

export type MeetingInput = {
  date?: Maybe<Scalars["DateTime"]>;
  number?: Maybe<Scalars["Int"]>;
  decisions?: Maybe<Scalars["ID"]>;
  protocol?: Maybe<Scalars["ID"]>;
  transcript?: Maybe<Scalars["ID"]>;
  sid?: Maybe<Scalars["String"]>;
  addedManually?: Maybe<Scalars["Boolean"]>;
  title?: Maybe<Scalars["String"]>;
  additionalFiles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  background?: Maybe<Scalars["String"]>;
  summary?: Maybe<Scalars["String"]>;
  emailViews?: Maybe<Scalars["Int"]>;
  isHidden?: Maybe<Scalars["Boolean"]>;
  plans?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  committee?: Maybe<Scalars["ID"]>;
};

export type Morph =
  | EmailMeetingPayload
  | UsersPermissionsMe
  | UsersPermissionsMeRole
  | UsersPermissionsLoginPayload
  | Area
  | CreateAreaPayload
  | UpdateAreaPayload
  | DeleteAreaPayload
  | AreaConnection
  | AreaAggregator
  | AreaGroupBy
  | AreaConnectionSid
  | AreaConnection_Id
  | AreaConnectionId
  | AreaConnectionCreatedAt
  | AreaConnectionUpdatedAt
  | Comment
  | CreateCommentPayload
  | UpdateCommentPayload
  | DeleteCommentPayload
  | CommentConnection
  | CommentAggregator
  | CommentGroupBy
  | CommentConnectionTitle
  | CommentConnectionName
  | CommentConnectionContent
  | CommentConnectionCreatedAt
  | CommentConnectionParent
  | CommentConnectionUser
  | CommentConnectionIsHidden
  | CommentConnectionIsPinned
  | CommentConnectionPlan
  | CommentConnection_Id
  | CommentConnectionId
  | CommentConnectionUpdatedAt
  | Committee
  | CreateCommitteePayload
  | UpdateCommitteePayload
  | DeleteCommitteePayload
  | CommitteeConnection
  | CommitteeAggregator
  | CommitteeGroupBy
  | CommitteeConnectionSid
  | CommitteeConnectionParent
  | CommitteeConnectionArea
  | CommitteeConnectionIsHidden
  | CommitteeConnection_Id
  | CommitteeConnectionId
  | CommitteeConnectionCreatedAt
  | CommitteeConnectionUpdatedAt
  | Meeting
  | CreateMeetingPayload
  | UpdateMeetingPayload
  | DeleteMeetingPayload
  | MeetingConnection
  | MeetingAggregator
  | MeetingAggregatorSum
  | MeetingAggregatorAvg
  | MeetingAggregatorMin
  | MeetingAggregatorMax
  | MeetingGroupBy
  | MeetingConnectionDate
  | MeetingConnectionNumber
  | MeetingConnectionDecisions
  | MeetingConnectionProtocol
  | MeetingConnectionTranscript
  | MeetingConnectionSid
  | MeetingConnectionAddedManually
  | MeetingConnectionTitle
  | MeetingConnectionBackground
  | MeetingConnectionSummary
  | MeetingConnectionEmailViews
  | MeetingConnectionIsHidden
  | MeetingConnectionCommittee
  | MeetingConnection_Id
  | MeetingConnectionId
  | MeetingConnectionCreatedAt
  | MeetingConnectionUpdatedAt
  | Parser
  | CreateParserPayload
  | UpdateParserPayload
  | DeleteParserPayload
  | ParserConnection
  | ParserAggregator
  | ParserGroupBy
  | ParserConnectionFor
  | ParserConnectionUrl
  | ParserConnectionActive
  | ParserConnectionObjectSelector
  | ParserConnectionSidMatch
  | ParserConnectionFields
  | ParserConnectionUrlByExistingItem
  | ParserConnectionMethod
  | ParserConnectionRequestParams
  | ParserConnectionRunInterval
  | ParserConnectionFileFields
  | ParserConnection_Id
  | ParserConnectionId
  | ParserConnectionCreatedAt
  | ParserConnectionUpdatedAt
  | Plan
  | CreatePlanPayload
  | UpdatePlanPayload
  | DeletePlanPayload
  | PlanConnection
  | PlanAggregator
  | PlanAggregatorSum
  | PlanAggregatorAvg
  | PlanAggregatorMin
  | PlanAggregatorMax
  | PlanGroupBy
  | PlanConnectionName
  | PlanConnectionStatus
  | PlanConnectionLastUpdate
  | PlanConnectionLocation
  | PlanConnectionMunicipality
  | PlanConnectionSettlement
  | PlanConnectionSections
  | PlanConnectionType
  | PlanConnectionSid
  | PlanConnectionTargets
  | PlanConnectionNumber
  | PlanConnectionSubmission
  | PlanConnectionStype
  | PlanConnectionAddedManually
  | PlanConnectionStreet
  | PlanConnectionHouseNumber
  | PlanConnectionCommentsAreLocked
  | PlanConnection_Id
  | PlanConnectionId
  | PlanConnectionCreatedAt
  | PlanConnectionUpdatedAt
  | UploadFile
  | UploadFileConnection
  | UploadFileAggregator
  | UploadFileGroupBy
  | UploadFileConnectionName
  | UploadFileConnectionHash
  | UploadFileConnectionSha256
  | UploadFileConnectionExt
  | UploadFileConnectionMime
  | UploadFileConnectionSize
  | UploadFileConnectionUrl
  | UploadFileConnectionProvider
  | UploadFileConnectionProvider_Metadata
  | UploadFileConnection_Id
  | UploadFileConnectionId
  | UploadFileConnectionCreatedAt
  | UploadFileConnectionUpdatedAt
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | CreateRolePayload
  | UpdateRolePayload
  | DeleteRolePayload
  | UsersPermissionsRoleConnection
  | UsersPermissionsRoleAggregator
  | UsersPermissionsRoleGroupBy
  | UsersPermissionsRoleConnectionName
  | UsersPermissionsRoleConnectionDescription
  | UsersPermissionsRoleConnectionType
  | UsersPermissionsRoleConnection_Id
  | UsersPermissionsRoleConnectionId
  | UsersPermissionsUser
  | CreateUserPayload
  | UpdateUserPayload
  | DeleteUserPayload
  | UsersPermissionsUserConnection
  | UsersPermissionsUserAggregator
  | UsersPermissionsUserGroupBy
  | UsersPermissionsUserConnectionUsername
  | UsersPermissionsUserConnectionEmail
  | UsersPermissionsUserConnectionProvider
  | UsersPermissionsUserConnectionConfirmed
  | UsersPermissionsUserConnectionBlocked
  | UsersPermissionsUserConnectionRole
  | UsersPermissionsUserConnectionFirstName
  | UsersPermissionsUserConnectionLastName
  | UsersPermissionsUserConnectionCity
  | UsersPermissionsUserConnectionOrganization
  | UsersPermissionsUserConnectionJob
  | UsersPermissionsUserConnectionUserImage
  | UsersPermissionsUserConnection_Id
  | UsersPermissionsUserConnectionId
  | UsersPermissionsUserConnectionCreatedAt
  | UsersPermissionsUserConnectionUpdatedAt;

export type Mutation = {
  __typename?: "Mutation";
  createArea?: Maybe<CreateAreaPayload>;
  updateArea?: Maybe<UpdateAreaPayload>;
  deleteArea?: Maybe<DeleteAreaPayload>;
  createComment?: Maybe<CreateCommentPayload>;
  updateComment?: Maybe<UpdateCommentPayload>;
  deleteComment?: Maybe<DeleteCommentPayload>;
  createCommittee?: Maybe<CreateCommitteePayload>;
  updateCommittee?: Maybe<UpdateCommitteePayload>;
  deleteCommittee?: Maybe<DeleteCommitteePayload>;
  createMeeting?: Maybe<CreateMeetingPayload>;
  updateMeeting?: Maybe<UpdateMeetingPayload>;
  deleteMeeting?: Maybe<DeleteMeetingPayload>;
  createParser?: Maybe<CreateParserPayload>;
  updateParser?: Maybe<UpdateParserPayload>;
  deleteParser?: Maybe<DeleteParserPayload>;
  createPlan?: Maybe<CreatePlanPayload>;
  updatePlan?: Maybe<UpdatePlanPayload>;
  deletePlan?: Maybe<DeletePlanPayload>;
  /** Create a new role */
  createRole?: Maybe<CreateRolePayload>;
  /** Update an existing role */
  updateRole?: Maybe<UpdateRolePayload>;
  /** Delete an existing role */
  deleteRole?: Maybe<DeleteRolePayload>;
  /** Create a new user */
  createUser?: Maybe<CreateUserPayload>;
  /** Update an existing user */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Delete an existing user */
  deleteUser?: Maybe<DeleteUserPayload>;
  updateMyComment?: Maybe<UpdateCommentPayload>;
  emailMeeting?: Maybe<EmailMeetingPayload>;
  updateMyMeeting?: Maybe<UpdateMeetingPayload>;
  updateMyPlan?: Maybe<UpdatePlanPayload>;
  upload: UploadFile;
  multipleUpload: Array<Maybe<UploadFile>>;
  login: UsersPermissionsLoginPayload;
  register: UsersPermissionsLoginPayload;
  updateMe?: Maybe<UpdateUserPayload>;
};

export type MutationCreateAreaArgs = {
  input?: Maybe<CreateAreaInput>;
};

export type MutationUpdateAreaArgs = {
  input?: Maybe<UpdateAreaInput>;
};

export type MutationDeleteAreaArgs = {
  input?: Maybe<DeleteAreaInput>;
};

export type MutationCreateCommentArgs = {
  input?: Maybe<CreateCommentInput>;
};

export type MutationUpdateCommentArgs = {
  input?: Maybe<UpdateCommentInput>;
};

export type MutationDeleteCommentArgs = {
  input?: Maybe<DeleteCommentInput>;
};

export type MutationCreateCommitteeArgs = {
  input?: Maybe<CreateCommitteeInput>;
};

export type MutationUpdateCommitteeArgs = {
  input?: Maybe<UpdateCommitteeInput>;
};

export type MutationDeleteCommitteeArgs = {
  input?: Maybe<DeleteCommitteeInput>;
};

export type MutationCreateMeetingArgs = {
  input?: Maybe<CreateMeetingInput>;
};

export type MutationUpdateMeetingArgs = {
  input?: Maybe<UpdateMeetingInput>;
};

export type MutationDeleteMeetingArgs = {
  input?: Maybe<DeleteMeetingInput>;
};

export type MutationCreateParserArgs = {
  input?: Maybe<CreateParserInput>;
};

export type MutationUpdateParserArgs = {
  input?: Maybe<UpdateParserInput>;
};

export type MutationDeleteParserArgs = {
  input?: Maybe<DeleteParserInput>;
};

export type MutationCreatePlanArgs = {
  input?: Maybe<CreatePlanInput>;
};

export type MutationUpdatePlanArgs = {
  input?: Maybe<UpdatePlanInput>;
};

export type MutationDeletePlanArgs = {
  input?: Maybe<DeletePlanInput>;
};

export type MutationCreateRoleArgs = {
  input?: Maybe<CreateRoleInput>;
};

export type MutationUpdateRoleArgs = {
  input?: Maybe<UpdateRoleInput>;
};

export type MutationDeleteRoleArgs = {
  input?: Maybe<DeleteRoleInput>;
};

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>;
};

export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};

export type MutationDeleteUserArgs = {
  input?: Maybe<DeleteUserInput>;
};

export type MutationUpdateMyCommentArgs = {
  input?: Maybe<UpdateCommentInput>;
};

export type MutationEmailMeetingArgs = {
  input: EmailMeetingInput;
};

export type MutationUpdateMyMeetingArgs = {
  input?: Maybe<UpdateMeetingInput>;
};

export type MutationUpdateMyPlanArgs = {
  input?: Maybe<UpdatePlanInput>;
};

export type MutationUploadArgs = {
  refId?: Maybe<Scalars["ID"]>;
  ref?: Maybe<Scalars["String"]>;
  field?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  file: Scalars["Upload"];
};

export type MutationMultipleUploadArgs = {
  refId?: Maybe<Scalars["ID"]>;
  ref?: Maybe<Scalars["String"]>;
  field?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  files: Array<Maybe<Scalars["Upload"]>>;
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationRegisterArgs = {
  input: UserInput;
};

export type MutationUpdateMeArgs = {
  input?: Maybe<UpdateUserInput>;
};

export type Parser = {
  __typename?: "Parser";
  for?: Maybe<Enum_Parser_For>;
  url?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
  objectSelector?: Maybe<Scalars["String"]>;
  sidMatch?: Maybe<Scalars["String"]>;
  fields?: Maybe<Scalars["String"]>;
  urlByExistingItem?: Maybe<Enum_Parser_Urlbyexistingitem>;
  method?: Maybe<Enum_Parser_Method>;
  requestParams?: Maybe<Scalars["String"]>;
  runInterval?: Maybe<Enum_Parser_Runinterval>;
  fileFields?: Maybe<Scalars["String"]>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type ParserAggregator = {
  __typename?: "ParserAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type ParserConnection = {
  __typename?: "ParserConnection";
  values?: Maybe<Array<Maybe<Parser>>>;
  groupBy?: Maybe<ParserGroupBy>;
  aggregate?: Maybe<ParserAggregator>;
};

export type ParserConnection_Id = {
  __typename?: "ParserConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionActive = {
  __typename?: "ParserConnectionActive";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionCreatedAt = {
  __typename?: "ParserConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionFields = {
  __typename?: "ParserConnectionFields";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionFileFields = {
  __typename?: "ParserConnectionFileFields";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionFor = {
  __typename?: "ParserConnectionFor";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionId = {
  __typename?: "ParserConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionMethod = {
  __typename?: "ParserConnectionMethod";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionObjectSelector = {
  __typename?: "ParserConnectionObjectSelector";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionRequestParams = {
  __typename?: "ParserConnectionRequestParams";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionRunInterval = {
  __typename?: "ParserConnectionRunInterval";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionSidMatch = {
  __typename?: "ParserConnectionSidMatch";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionUpdatedAt = {
  __typename?: "ParserConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionUrl = {
  __typename?: "ParserConnectionUrl";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserConnectionUrlByExistingItem = {
  __typename?: "ParserConnectionUrlByExistingItem";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<ParserConnection>;
};

export type ParserGroupBy = {
  __typename?: "ParserGroupBy";
  for?: Maybe<Array<Maybe<ParserConnectionFor>>>;
  url?: Maybe<Array<Maybe<ParserConnectionUrl>>>;
  active?: Maybe<Array<Maybe<ParserConnectionActive>>>;
  objectSelector?: Maybe<Array<Maybe<ParserConnectionObjectSelector>>>;
  sidMatch?: Maybe<Array<Maybe<ParserConnectionSidMatch>>>;
  fields?: Maybe<Array<Maybe<ParserConnectionFields>>>;
  urlByExistingItem?: Maybe<Array<Maybe<ParserConnectionUrlByExistingItem>>>;
  method?: Maybe<Array<Maybe<ParserConnectionMethod>>>;
  requestParams?: Maybe<Array<Maybe<ParserConnectionRequestParams>>>;
  runInterval?: Maybe<Array<Maybe<ParserConnectionRunInterval>>>;
  fileFields?: Maybe<Array<Maybe<ParserConnectionFileFields>>>;
  _id?: Maybe<Array<Maybe<ParserConnection_Id>>>;
  id?: Maybe<Array<Maybe<ParserConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<ParserConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<ParserConnectionUpdatedAt>>>;
};

export type ParserInput = {
  for?: Maybe<Enum_Parser_For>;
  url?: Maybe<Scalars["String"]>;
  active?: Maybe<Scalars["Boolean"]>;
  objectSelector?: Maybe<Scalars["String"]>;
  sidMatch?: Maybe<Scalars["String"]>;
  fields?: Maybe<Scalars["String"]>;
  urlByExistingItem?: Maybe<Enum_Parser_Urlbyexistingitem>;
  method?: Maybe<Enum_Parser_Method>;
  requestParams?: Maybe<Scalars["String"]>;
  runInterval?: Maybe<Enum_Parser_Runinterval>;
  fileFields?: Maybe<Scalars["String"]>;
};

export type Plan = {
  __typename?: "Plan";
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  lastUpdate?: Maybe<Scalars["DateTime"]>;
  location?: Maybe<Scalars["String"]>;
  municipality?: Maybe<Scalars["String"]>;
  settlement?: Maybe<Scalars["String"]>;
  sections?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  sid?: Maybe<Scalars["String"]>;
  targets?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["String"]>;
  submission?: Maybe<Scalars["DateTime"]>;
  stype?: Maybe<Scalars["Int"]>;
  addedManually?: Maybe<Scalars["Boolean"]>;
  street?: Maybe<Scalars["String"]>;
  houseNumber?: Maybe<Scalars["Int"]>;
  commentsAreLocked?: Maybe<Scalars["Boolean"]>;
  attachedFiles?: Maybe<Array<Maybe<UploadFile>>>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type PlanAttachedFilesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type PlanMeetingsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type PlanCommentsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type PlanAggregator = {
  __typename?: "PlanAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
  sum?: Maybe<PlanAggregatorSum>;
  avg?: Maybe<PlanAggregatorAvg>;
  min?: Maybe<PlanAggregatorMin>;
  max?: Maybe<PlanAggregatorMax>;
};

export type PlanAggregatorAvg = {
  __typename?: "PlanAggregatorAvg";
  stype?: Maybe<Scalars["Float"]>;
  houseNumber?: Maybe<Scalars["Float"]>;
};

export type PlanAggregatorMax = {
  __typename?: "PlanAggregatorMax";
  stype?: Maybe<Scalars["Float"]>;
  houseNumber?: Maybe<Scalars["Float"]>;
};

export type PlanAggregatorMin = {
  __typename?: "PlanAggregatorMin";
  stype?: Maybe<Scalars["Float"]>;
  houseNumber?: Maybe<Scalars["Float"]>;
};

export type PlanAggregatorSum = {
  __typename?: "PlanAggregatorSum";
  stype?: Maybe<Scalars["Float"]>;
  houseNumber?: Maybe<Scalars["Float"]>;
};

export type PlanConnection = {
  __typename?: "PlanConnection";
  values?: Maybe<Array<Maybe<Plan>>>;
  groupBy?: Maybe<PlanGroupBy>;
  aggregate?: Maybe<PlanAggregator>;
};

export type PlanConnection_Id = {
  __typename?: "PlanConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionAddedManually = {
  __typename?: "PlanConnectionAddedManually";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionCommentsAreLocked = {
  __typename?: "PlanConnectionCommentsAreLocked";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionCreatedAt = {
  __typename?: "PlanConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionHouseNumber = {
  __typename?: "PlanConnectionHouseNumber";
  key?: Maybe<Scalars["Int"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionId = {
  __typename?: "PlanConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionLastUpdate = {
  __typename?: "PlanConnectionLastUpdate";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionLocation = {
  __typename?: "PlanConnectionLocation";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionMunicipality = {
  __typename?: "PlanConnectionMunicipality";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionName = {
  __typename?: "PlanConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionNumber = {
  __typename?: "PlanConnectionNumber";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionSections = {
  __typename?: "PlanConnectionSections";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionSettlement = {
  __typename?: "PlanConnectionSettlement";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionSid = {
  __typename?: "PlanConnectionSid";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionStatus = {
  __typename?: "PlanConnectionStatus";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionStreet = {
  __typename?: "PlanConnectionStreet";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionStype = {
  __typename?: "PlanConnectionStype";
  key?: Maybe<Scalars["Int"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionSubmission = {
  __typename?: "PlanConnectionSubmission";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionTargets = {
  __typename?: "PlanConnectionTargets";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionType = {
  __typename?: "PlanConnectionType";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanConnectionUpdatedAt = {
  __typename?: "PlanConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<PlanConnection>;
};

export type PlanGroupBy = {
  __typename?: "PlanGroupBy";
  name?: Maybe<Array<Maybe<PlanConnectionName>>>;
  status?: Maybe<Array<Maybe<PlanConnectionStatus>>>;
  lastUpdate?: Maybe<Array<Maybe<PlanConnectionLastUpdate>>>;
  location?: Maybe<Array<Maybe<PlanConnectionLocation>>>;
  municipality?: Maybe<Array<Maybe<PlanConnectionMunicipality>>>;
  settlement?: Maybe<Array<Maybe<PlanConnectionSettlement>>>;
  sections?: Maybe<Array<Maybe<PlanConnectionSections>>>;
  type?: Maybe<Array<Maybe<PlanConnectionType>>>;
  sid?: Maybe<Array<Maybe<PlanConnectionSid>>>;
  targets?: Maybe<Array<Maybe<PlanConnectionTargets>>>;
  number?: Maybe<Array<Maybe<PlanConnectionNumber>>>;
  submission?: Maybe<Array<Maybe<PlanConnectionSubmission>>>;
  stype?: Maybe<Array<Maybe<PlanConnectionStype>>>;
  addedManually?: Maybe<Array<Maybe<PlanConnectionAddedManually>>>;
  street?: Maybe<Array<Maybe<PlanConnectionStreet>>>;
  houseNumber?: Maybe<Array<Maybe<PlanConnectionHouseNumber>>>;
  commentsAreLocked?: Maybe<Array<Maybe<PlanConnectionCommentsAreLocked>>>;
  _id?: Maybe<Array<Maybe<PlanConnection_Id>>>;
  id?: Maybe<Array<Maybe<PlanConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<PlanConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<PlanConnectionUpdatedAt>>>;
};

export type PlanInput = {
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  lastUpdate?: Maybe<Scalars["DateTime"]>;
  location?: Maybe<Scalars["String"]>;
  municipality?: Maybe<Scalars["String"]>;
  settlement?: Maybe<Scalars["String"]>;
  sections?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  sid?: Maybe<Scalars["String"]>;
  targets?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["String"]>;
  submission?: Maybe<Scalars["DateTime"]>;
  stype?: Maybe<Scalars["Int"]>;
  addedManually?: Maybe<Scalars["Boolean"]>;
  attachedFiles?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  street?: Maybe<Scalars["String"]>;
  houseNumber?: Maybe<Scalars["Int"]>;
  meetings?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  commentsAreLocked?: Maybe<Scalars["Boolean"]>;
  comments?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type Query = {
  __typename?: "Query";
  area?: Maybe<Area>;
  areas?: Maybe<Array<Maybe<Area>>>;
  areasConnection?: Maybe<AreaConnection>;
  comment?: Maybe<Comment>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  commentsConnection?: Maybe<CommentConnection>;
  committee?: Maybe<Committee>;
  committees?: Maybe<Array<Maybe<Committee>>>;
  committeesConnection?: Maybe<CommitteeConnection>;
  meeting?: Maybe<Meeting>;
  meetings?: Maybe<Array<Maybe<Meeting>>>;
  meetingsConnection?: Maybe<MeetingConnection>;
  parser?: Maybe<Parser>;
  parsers?: Maybe<Array<Maybe<Parser>>>;
  parsersConnection?: Maybe<ParserConnection>;
  plan?: Maybe<Plan>;
  plans?: Maybe<Array<Maybe<Plan>>>;
  plansConnection?: Maybe<PlanConnection>;
  files?: Maybe<Array<Maybe<UploadFile>>>;
  filesConnection?: Maybe<UploadFileConnection>;
  role?: Maybe<UsersPermissionsRole>;
  /** Retrieve all the existing roles. You can't apply filters on this query. */
  roles?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  rolesConnection?: Maybe<UsersPermissionsRoleConnection>;
  user?: Maybe<UsersPermissionsUser>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  usersConnection?: Maybe<UsersPermissionsUserConnection>;
  me?: Maybe<UsersPermissionsMe>;
};

export type QueryAreaArgs = {
  id: Scalars["ID"];
};

export type QueryAreasArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryAreasConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryCommentArgs = {
  id: Scalars["ID"];
};

export type QueryCommentsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryCommentsConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryCommitteeArgs = {
  id: Scalars["ID"];
};

export type QueryCommitteesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryCommitteesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryMeetingArgs = {
  id: Scalars["ID"];
};

export type QueryMeetingsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryMeetingsConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryParserArgs = {
  id: Scalars["ID"];
};

export type QueryParsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryParsersConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryPlanArgs = {
  id: Scalars["ID"];
};

export type QueryPlansArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryPlansConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryFilesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryFilesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryRoleArgs = {
  id: Scalars["ID"];
};

export type QueryRolesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryRolesConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryUsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type QueryUsersConnectionArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type RoleInput = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  users?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type UpdateAreaInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditAreaInput>;
};

export type UpdateAreaPayload = {
  __typename?: "updateAreaPayload";
  area?: Maybe<Area>;
};

export type UpdateCommentInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCommentInput>;
};

export type UpdateCommentPayload = {
  __typename?: "updateCommentPayload";
  comment?: Maybe<Comment>;
};

export type UpdateCommitteeInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditCommitteeInput>;
};

export type UpdateCommitteePayload = {
  __typename?: "updateCommitteePayload";
  committee?: Maybe<Committee>;
};

export type UpdateMeetingInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditMeetingInput>;
};

export type UpdateMeetingPayload = {
  __typename?: "updateMeetingPayload";
  meeting?: Maybe<Meeting>;
};

export type UpdateParserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditParserInput>;
};

export type UpdateParserPayload = {
  __typename?: "updateParserPayload";
  parser?: Maybe<Parser>;
};

export type UpdatePlanInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditPlanInput>;
};

export type UpdatePlanPayload = {
  __typename?: "updatePlanPayload";
  plan?: Maybe<Plan>;
};

export type UpdateRoleInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditRoleInput>;
};

export type UpdateRolePayload = {
  __typename?: "updateRolePayload";
  role?: Maybe<UsersPermissionsRole>;
};

export type UpdateUserInput = {
  where?: Maybe<InputId>;
  data?: Maybe<EditUserInput>;
};

export type UpdateUserPayload = {
  __typename?: "updateUserPayload";
  user?: Maybe<UsersPermissionsUser>;
};

export type UploadFile = {
  __typename?: "UploadFile";
  name: Scalars["String"];
  hash: Scalars["String"];
  sha256?: Maybe<Scalars["String"]>;
  ext?: Maybe<Scalars["String"]>;
  mime: Scalars["String"];
  size: Scalars["String"];
  url: Scalars["String"];
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<Morph>>>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UploadFileRelatedArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UploadFileAggregator = {
  __typename?: "UploadFileAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UploadFileConnection = {
  __typename?: "UploadFileConnection";
  values?: Maybe<Array<Maybe<UploadFile>>>;
  groupBy?: Maybe<UploadFileGroupBy>;
  aggregate?: Maybe<UploadFileAggregator>;
};

export type UploadFileConnection_Id = {
  __typename?: "UploadFileConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionCreatedAt = {
  __typename?: "UploadFileConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionExt = {
  __typename?: "UploadFileConnectionExt";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionHash = {
  __typename?: "UploadFileConnectionHash";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionId = {
  __typename?: "UploadFileConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionMime = {
  __typename?: "UploadFileConnectionMime";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionName = {
  __typename?: "UploadFileConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider = {
  __typename?: "UploadFileConnectionProvider";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionProvider_Metadata = {
  __typename?: "UploadFileConnectionProvider_metadata";
  key?: Maybe<Scalars["JSON"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSha256 = {
  __typename?: "UploadFileConnectionSha256";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionSize = {
  __typename?: "UploadFileConnectionSize";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUpdatedAt = {
  __typename?: "UploadFileConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileConnectionUrl = {
  __typename?: "UploadFileConnectionUrl";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UploadFileConnection>;
};

export type UploadFileGroupBy = {
  __typename?: "UploadFileGroupBy";
  name?: Maybe<Array<Maybe<UploadFileConnectionName>>>;
  hash?: Maybe<Array<Maybe<UploadFileConnectionHash>>>;
  sha256?: Maybe<Array<Maybe<UploadFileConnectionSha256>>>;
  ext?: Maybe<Array<Maybe<UploadFileConnectionExt>>>;
  mime?: Maybe<Array<Maybe<UploadFileConnectionMime>>>;
  size?: Maybe<Array<Maybe<UploadFileConnectionSize>>>;
  url?: Maybe<Array<Maybe<UploadFileConnectionUrl>>>;
  provider?: Maybe<Array<Maybe<UploadFileConnectionProvider>>>;
  provider_metadata?: Maybe<
    Array<Maybe<UploadFileConnectionProvider_Metadata>>
  >;
  _id?: Maybe<Array<Maybe<UploadFileConnection_Id>>>;
  id?: Maybe<Array<Maybe<UploadFileConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<UploadFileConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<UploadFileConnectionUpdatedAt>>>;
};

export type UserInput = {
  username: Scalars["String"];
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
  resetPasswordToken?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<Scalars["ID"]>;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  city?: Maybe<Scalars["String"]>;
  organization?: Maybe<Scalars["String"]>;
  job?: Maybe<Scalars["String"]>;
  userImage?: Maybe<Scalars["ID"]>;
  committees?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  subscribedCommittees?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  comments?: Maybe<Array<Maybe<Scalars["ID"]>>>;
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"];
  password: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt: Scalars["String"];
  user: UsersPermissionsUser;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UsersPermissionsMeRole>;
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  id: Scalars["ID"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  type: Scalars["String"];
  controller: Scalars["String"];
  action: Scalars["String"];
  enabled: Scalars["Boolean"];
  policy?: Maybe<Scalars["String"]>;
  role?: Maybe<UsersPermissionsRole>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
  permissions?: Maybe<Array<Maybe<UsersPermissionsPermission>>>;
  users?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
};

export type UsersPermissionsRolePermissionsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsRoleUsersArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsRoleAggregator = {
  __typename?: "UsersPermissionsRoleAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UsersPermissionsRoleConnection = {
  __typename?: "UsersPermissionsRoleConnection";
  values?: Maybe<Array<Maybe<UsersPermissionsRole>>>;
  groupBy?: Maybe<UsersPermissionsRoleGroupBy>;
  aggregate?: Maybe<UsersPermissionsRoleAggregator>;
};

export type UsersPermissionsRoleConnection_Id = {
  __typename?: "UsersPermissionsRoleConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionDescription = {
  __typename?: "UsersPermissionsRoleConnectionDescription";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionId = {
  __typename?: "UsersPermissionsRoleConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionName = {
  __typename?: "UsersPermissionsRoleConnectionName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleConnectionType = {
  __typename?: "UsersPermissionsRoleConnectionType";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsRoleConnection>;
};

export type UsersPermissionsRoleGroupBy = {
  __typename?: "UsersPermissionsRoleGroupBy";
  name?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionName>>>;
  description?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionDescription>>>;
  type?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionType>>>;
  _id?: Maybe<Array<Maybe<UsersPermissionsRoleConnection_Id>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsRoleConnectionId>>>;
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  username: Scalars["String"];
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  blocked?: Maybe<Scalars["Boolean"]>;
  role?: Maybe<UsersPermissionsRole>;
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  city?: Maybe<Scalars["String"]>;
  organization?: Maybe<Scalars["String"]>;
  job?: Maybe<Scalars["String"]>;
  userImage?: Maybe<UploadFile>;
  committees?: Maybe<Array<Maybe<Committee>>>;
  subscribedCommittees?: Maybe<Array<Maybe<Committee>>>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  _id: Scalars["ID"];
  id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type UsersPermissionsUserCommitteesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsUserSubscribedCommitteesArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsUserCommentsArgs = {
  sort?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  start?: Maybe<Scalars["Int"]>;
  where?: Maybe<Scalars["JSON"]>;
};

export type UsersPermissionsUserAggregator = {
  __typename?: "UsersPermissionsUserAggregator";
  count?: Maybe<Scalars["Int"]>;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type UsersPermissionsUserConnection = {
  __typename?: "UsersPermissionsUserConnection";
  values?: Maybe<Array<Maybe<UsersPermissionsUser>>>;
  groupBy?: Maybe<UsersPermissionsUserGroupBy>;
  aggregate?: Maybe<UsersPermissionsUserAggregator>;
};

export type UsersPermissionsUserConnection_Id = {
  __typename?: "UsersPermissionsUserConnection_id";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionBlocked = {
  __typename?: "UsersPermissionsUserConnectionBlocked";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCity = {
  __typename?: "UsersPermissionsUserConnectionCity";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionConfirmed = {
  __typename?: "UsersPermissionsUserConnectionConfirmed";
  key?: Maybe<Scalars["Boolean"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionCreatedAt = {
  __typename?: "UsersPermissionsUserConnectionCreatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionEmail = {
  __typename?: "UsersPermissionsUserConnectionEmail";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionFirstName = {
  __typename?: "UsersPermissionsUserConnectionFirstName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionId = {
  __typename?: "UsersPermissionsUserConnectionId";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionJob = {
  __typename?: "UsersPermissionsUserConnectionJob";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionLastName = {
  __typename?: "UsersPermissionsUserConnectionLastName";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionOrganization = {
  __typename?: "UsersPermissionsUserConnectionOrganization";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionProvider = {
  __typename?: "UsersPermissionsUserConnectionProvider";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionRole = {
  __typename?: "UsersPermissionsUserConnectionRole";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUpdatedAt = {
  __typename?: "UsersPermissionsUserConnectionUpdatedAt";
  key?: Maybe<Scalars["DateTime"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUserImage = {
  __typename?: "UsersPermissionsUserConnectionUserImage";
  key?: Maybe<Scalars["ID"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserConnectionUsername = {
  __typename?: "UsersPermissionsUserConnectionUsername";
  key?: Maybe<Scalars["String"]>;
  connection?: Maybe<UsersPermissionsUserConnection>;
};

export type UsersPermissionsUserGroupBy = {
  __typename?: "UsersPermissionsUserGroupBy";
  username?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUsername>>>;
  email?: Maybe<Array<Maybe<UsersPermissionsUserConnectionEmail>>>;
  provider?: Maybe<Array<Maybe<UsersPermissionsUserConnectionProvider>>>;
  confirmed?: Maybe<Array<Maybe<UsersPermissionsUserConnectionConfirmed>>>;
  blocked?: Maybe<Array<Maybe<UsersPermissionsUserConnectionBlocked>>>;
  role?: Maybe<Array<Maybe<UsersPermissionsUserConnectionRole>>>;
  firstName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionFirstName>>>;
  lastName?: Maybe<Array<Maybe<UsersPermissionsUserConnectionLastName>>>;
  city?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCity>>>;
  organization?: Maybe<
    Array<Maybe<UsersPermissionsUserConnectionOrganization>>
  >;
  job?: Maybe<Array<Maybe<UsersPermissionsUserConnectionJob>>>;
  userImage?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUserImage>>>;
  _id?: Maybe<Array<Maybe<UsersPermissionsUserConnection_Id>>>;
  id?: Maybe<Array<Maybe<UsersPermissionsUserConnectionId>>>;
  createdAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionCreatedAt>>>;
  updatedAt?: Maybe<Array<Maybe<UsersPermissionsUserConnectionUpdatedAt>>>;
};
