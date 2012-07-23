//
// Autogenerated by Thrift Compiler (0.7.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;
var ttypes = module.exports = {};
var NotAuthorizedException = module.exports.NotAuthorizedException = function(args) {
  Thrift.TException.call(this, "NotAuthorizedException")
  this.name = "NotAuthorizedException"
  this.message = null;
  if (args) {
    if (args.message !== undefined) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(NotAuthorizedException, Thrift.TException);
NotAuthorizedException.prototype.name = 'NotAuthorizedException';
NotAuthorizedException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

NotAuthorizedException.prototype.write = function(output) {
  output.writeStructBegin('NotAuthorizedException');
  if (this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var AuthorizationTimeoutException = module.exports.AuthorizationTimeoutException = function(args) {
  Thrift.TException.call(this, "AuthorizationTimeoutException")
  this.name = "AuthorizationTimeoutException"
  this.message = null;
  if (args) {
    if (args.message !== undefined) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(AuthorizationTimeoutException, Thrift.TException);
AuthorizationTimeoutException.prototype.name = 'AuthorizationTimeoutException';
AuthorizationTimeoutException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

AuthorizationTimeoutException.prototype.write = function(output) {
  output.writeStructBegin('AuthorizationTimeoutException');
  if (this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var DelegationToken = module.exports.DelegationToken = function(args) {
  this.token = null;
  if (args) {
    if (args.token !== undefined) {
      this.token = args.token;
    }
  }
};
DelegationToken.prototype = {};
DelegationToken.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.token = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

DelegationToken.prototype.write = function(output) {
  output.writeStructBegin('DelegationToken');
  if (this.token) {
    output.writeFieldBegin('token', Thrift.Type.STRING, 1);
    output.writeString(this.token);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ResourceIdentifier = module.exports.ResourceIdentifier = function(args) {
  this.resource = null;
  this.version = null;
  this.accountId = 'demo';
  if (args) {
    if (args.resource !== undefined) {
      this.resource = args.resource;
    }
    if (args.version !== undefined) {
      this.version = args.version;
    }
    if (args.accountId !== undefined) {
      this.accountId = args.accountId;
    }
  }
};
ResourceIdentifier.prototype = {};
ResourceIdentifier.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.resource = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.version = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.accountId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ResourceIdentifier.prototype.write = function(output) {
  output.writeStructBegin('ResourceIdentifier');
  if (this.resource) {
    output.writeFieldBegin('resource', Thrift.Type.STRING, 1);
    output.writeString(this.resource);
    output.writeFieldEnd();
  }
  if (this.version) {
    output.writeFieldBegin('version', Thrift.Type.I32, 2);
    output.writeI32(this.version);
    output.writeFieldEnd();
  }
  if (this.accountId) {
    output.writeFieldBegin('accountId', Thrift.Type.STRING, 3);
    output.writeString(this.accountId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ResourceInfo = module.exports.ResourceInfo = function(args) {
  this.filename = null;
  this.size = null;
  this.modtime = null;
  this.accountId = 'demo';
  if (args) {
    if (args.filename !== undefined) {
      this.filename = args.filename;
    }
    if (args.size !== undefined) {
      this.size = args.size;
    }
    if (args.modtime !== undefined) {
      this.modtime = args.modtime;
    }
    if (args.accountId !== undefined) {
      this.accountId = args.accountId;
    }
  }
};
ResourceInfo.prototype = {};
ResourceInfo.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.filename = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.size = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I64) {
        this.modtime = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.accountId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ResourceInfo.prototype.write = function(output) {
  output.writeStructBegin('ResourceInfo');
  if (this.filename) {
    output.writeFieldBegin('filename', Thrift.Type.STRING, 1);
    output.writeString(this.filename);
    output.writeFieldEnd();
  }
  if (this.size) {
    output.writeFieldBegin('size', Thrift.Type.I32, 2);
    output.writeI32(this.size);
    output.writeFieldEnd();
  }
  if (this.modtime) {
    output.writeFieldBegin('modtime', Thrift.Type.I64, 3);
    output.writeI64(this.modtime);
    output.writeFieldEnd();
  }
  if (this.accountId) {
    output.writeFieldBegin('accountId', Thrift.Type.STRING, 4);
    output.writeString(this.accountId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FARServiceException = module.exports.FARServiceException = function(args) {
  Thrift.TException.call(this, "FARServiceException")
  this.name = "FARServiceException"
  this.message = null;
  if (args) {
    if (args.message !== undefined) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(FARServiceException, Thrift.TException);
FARServiceException.prototype.name = 'FARServiceException';
FARServiceException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FARServiceException.prototype.write = function(output) {
  output.writeStructBegin('FARServiceException');
  if (this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowVerificationStatus = module.exports.FlowVerificationStatus = function(args) {
  this.app = null;
  this.flow = null;
  this.status = null;
  this.message = null;
  if (args) {
    if (args.app !== undefined) {
      this.app = args.app;
    }
    if (args.flow !== undefined) {
      this.flow = args.flow;
    }
    if (args.status !== undefined) {
      this.status = args.status;
    }
    if (args.message !== undefined) {
      this.message = args.message;
    }
  }
};
FlowVerificationStatus.prototype = {};
FlowVerificationStatus.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.app = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.flow = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.status = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowVerificationStatus.prototype.write = function(output) {
  output.writeStructBegin('FlowVerificationStatus');
  if (this.app) {
    output.writeFieldBegin('app', Thrift.Type.STRING, 1);
    output.writeString(this.app);
    output.writeFieldEnd();
  }
  if (this.flow) {
    output.writeFieldBegin('flow', Thrift.Type.STRING, 2);
    output.writeString(this.flow);
    output.writeFieldEnd();
  }
  if (this.status) {
    output.writeFieldBegin('status', Thrift.Type.I32, 3);
    output.writeI32(this.status);
    output.writeFieldEnd();
  }
  if (this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 4);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FARStatus = module.exports.FARStatus = function(args) {
  this.overall = null;
  this.message = null;
  this.verification = null;
  if (args) {
    if (args.overall !== undefined) {
      this.overall = args.overall;
    }
    if (args.message !== undefined) {
      this.message = args.message;
    }
    if (args.verification !== undefined) {
      this.verification = args.verification;
    }
  }
};
FARStatus.prototype = {};
FARStatus.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.overall = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.verification = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = new ttypes.FlowVerificationStatus();
          elem6.read(input);
          this.verification.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FARStatus.prototype.write = function(output) {
  output.writeStructBegin('FARStatus');
  if (this.overall) {
    output.writeFieldBegin('overall', Thrift.Type.I32, 1);
    output.writeI32(this.overall);
    output.writeFieldEnd();
  }
  if (this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  if (this.verification) {
    output.writeFieldBegin('verification', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.STRUCT, this.verification.length);
    for (var iter7 in this.verification)
    {
      if (this.verification.hasOwnProperty(iter7))
      {
        iter7 = this.verification[iter7];
        iter7.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowIdentifier = module.exports.FlowIdentifier = function(args) {
  this.app = null;
  this.flow = null;
  this.version = null;
  this.accountId = 'demo';
  if (args) {
    if (args.app !== undefined) {
      this.app = args.app;
    }
    if (args.flow !== undefined) {
      this.flow = args.flow;
    }
    if (args.version !== undefined) {
      this.version = args.version;
    }
    if (args.accountId !== undefined) {
      this.accountId = args.accountId;
    }
  }
};
FlowIdentifier.prototype = {};
FlowIdentifier.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.app = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.flow = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.version = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRING) {
        this.accountId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowIdentifier.prototype.write = function(output) {
  output.writeStructBegin('FlowIdentifier');
  if (this.app) {
    output.writeFieldBegin('app', Thrift.Type.STRING, 1);
    output.writeString(this.app);
    output.writeFieldEnd();
  }
  if (this.flow) {
    output.writeFieldBegin('flow', Thrift.Type.STRING, 2);
    output.writeString(this.flow);
    output.writeFieldEnd();
  }
  if (this.version) {
    output.writeFieldBegin('version', Thrift.Type.I32, 3);
    output.writeI32(this.version);
    output.writeFieldEnd();
  }
  if (this.accountId) {
    output.writeFieldBegin('accountId', Thrift.Type.STRING, 4);
    output.writeString(this.accountId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowServiceException = module.exports.FlowServiceException = function(args) {
  Thrift.TException.call(this, "FlowServiceException")
  this.name = "FlowServiceException"
  this.message = null;
  if (args) {
    if (args.message !== undefined) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(FlowServiceException, Thrift.TException);
FlowServiceException.prototype.name = 'FlowServiceException';
FlowServiceException.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowServiceException.prototype.write = function(output) {
  output.writeStructBegin('FlowServiceException');
  if (this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowletStatus = module.exports.FlowletStatus = function(args) {
  this.name = null;
  this.code = null;
  this.message = null;
  if (args) {
    if (args.name !== undefined) {
      this.name = args.name;
    }
    if (args.code !== undefined) {
      this.code = args.code;
    }
    if (args.message !== undefined) {
      this.message = args.message;
    }
  }
};
FlowletStatus.prototype = {};
FlowletStatus.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.code = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowletStatus.prototype.write = function(output) {
  output.writeStructBegin('FlowletStatus');
  if (this.name) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 1);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.code) {
    output.writeFieldBegin('code', Thrift.Type.I32, 2);
    output.writeI32(this.code);
    output.writeFieldEnd();
  }
  if (this.message) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 3);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var RunIdentifier = module.exports.RunIdentifier = function(args) {
  this.id = null;
  if (args) {
    if (args.id !== undefined) {
      this.id = args.id;
    }
  }
};
RunIdentifier.prototype = {};
RunIdentifier.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.id = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

RunIdentifier.prototype.write = function(output) {
  output.writeStructBegin('RunIdentifier');
  if (this.id) {
    output.writeFieldBegin('id', Thrift.Type.STRING, 1);
    output.writeString(this.id);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowStatus = module.exports.FlowStatus = function(args) {
  this.appId = null;
  this.flowId = null;
  this.version = null;
  this.runId = null;
  this.status = null;
  if (args) {
    if (args.appId !== undefined) {
      this.appId = args.appId;
    }
    if (args.flowId !== undefined) {
      this.flowId = args.flowId;
    }
    if (args.version !== undefined) {
      this.version = args.version;
    }
    if (args.runId !== undefined) {
      this.runId = args.runId;
    }
    if (args.status !== undefined) {
      this.status = args.status;
    }
  }
};
FlowStatus.prototype = {};
FlowStatus.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.appId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.flowId = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.I32) {
        this.version = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.STRUCT) {
        this.runId = new ttypes.RunIdentifier();
        this.runId.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.STRING) {
        this.status = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowStatus.prototype.write = function(output) {
  output.writeStructBegin('FlowStatus');
  if (this.appId) {
    output.writeFieldBegin('appId', Thrift.Type.STRING, 1);
    output.writeString(this.appId);
    output.writeFieldEnd();
  }
  if (this.flowId) {
    output.writeFieldBegin('flowId', Thrift.Type.STRING, 2);
    output.writeString(this.flowId);
    output.writeFieldEnd();
  }
  if (this.version) {
    output.writeFieldBegin('version', Thrift.Type.I32, 3);
    output.writeI32(this.version);
    output.writeFieldEnd();
  }
  if (this.runId) {
    output.writeFieldBegin('runId', Thrift.Type.STRUCT, 4);
    this.runId.write(output);
    output.writeFieldEnd();
  }
  if (this.status) {
    output.writeFieldBegin('status', Thrift.Type.STRING, 5);
    output.writeString(this.status);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var FlowDescriptor = module.exports.FlowDescriptor = function(args) {
  this.identifier = null;
  this.arguments = null;
  if (args) {
    if (args.identifier !== undefined) {
      this.identifier = args.identifier;
    }
    if (args.arguments !== undefined) {
      this.arguments = args.arguments;
    }
  }
};
FlowDescriptor.prototype = {};
FlowDescriptor.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.identifier = new ttypes.FlowIdentifier();
        this.identifier.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.arguments = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = input.readString();
          this.arguments.push(elem14);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

FlowDescriptor.prototype.write = function(output) {
  output.writeStructBegin('FlowDescriptor');
  if (this.identifier) {
    output.writeFieldBegin('identifier', Thrift.Type.STRUCT, 1);
    this.identifier.write(output);
    output.writeFieldEnd();
  }
  if (this.arguments) {
    output.writeFieldBegin('arguments', Thrift.Type.LIST, 2);
    output.writeListBegin(Thrift.Type.STRING, this.arguments.length);
    for (var iter15 in this.arguments)
    {
      if (this.arguments.hasOwnProperty(iter15))
      {
        iter15 = this.arguments[iter15];
        output.writeString(iter15);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

