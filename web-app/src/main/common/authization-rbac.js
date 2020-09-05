const { RBAC } = require('rbac')

module.exports = class AuthizationRbac {

    constructor(rbac_opts) {
        this.rbac_opts = rbac_opts

    }

    roles=[];
    init() {
        this.rbac = new RBAC(this.rbac_opts)

        const rbac_options = this.rbac.options
        if (Array.isArray(rbac_options.roles) && typeof (rbac_options.permissions) === 'object' && typeof (rbac_options.grants) === 'object') {
            return this.rbac.init()
        }
        throw Error("rbac options sent to the constructor were invalid")
    }

    can(action, resource) {
        console.log('inside can')
        let arr=[]
         this.roles.forEach(role => arr.push(this.rbac.can(role, action, resource)));
         return Promise.all(arr).then(
              array=>{return array.some(bool=>bool==true)}
         )
         
    }

    canAll( permissions) {
        const canall=this.roles.some(role => this.rbac.canAll(role, permissions));
        return permissions.map(p=>canall);
    }

    canAny( permissions) {
        return this.roles.some(role => this.rbac.canAny(role, permissions));
    }

}