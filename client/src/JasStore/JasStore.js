import axios from 'axios';

const { token } = JSON.parse(localStorage.jas_login);

export function createJasStore() {
  return {
    allJobApplies: [],
    displayList: [],
    addNewFlag: false,
    updateFlag: false,
    deleteFlag: false,
    singleApplyData: {},
    isUserLogged: localStorage.getItem('jas_login') ? true : false,
    setAllJobApplies(applies) {
      this.allJobApplies = applies
    },
    setDisplayList(applies) {
      this.displayList = applies
    },
    setAddNewFlag() { this.addNewFlag = !this.addNewFlag },
    setUpdateFlag() { this.updateFlag = !this.updateFlag },
    setDeleteFlag() { this.deleteFlag = !this.deleteFlag },
    getApplies() {
      const { id } = JSON.parse(localStorage.jas_login);
      axios({
        method: 'get',
        url: `/jobapply/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.allJobApplies = [...res.data];
          };
        })
        .catch(error =>
          console.error(error)
        );
    },
    addNewApply(data) {
      const temp = [...this.allJobApplies];
      temp.push(data);
      this.allJobApplies = temp
      this.setAddNewFlag();
    },
    setSingleApplyData(applyData) {
      this.singleApplyData = applyData
    },
    updateApply(data) {
      const temp = [...this.allJobApplies];
      const index = temp.findIndex(apply => apply._id === data._id);
      temp[index] = { ...data };
      this.setAllJobApplies(temp);
      this.setDisplayList(temp);
      this.setUpdateFlag();
    },
    deleteApply() {
      axios({
        method: 'delete',
        url: `/jobapply/${this.singleApplyData._id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.status === 200) {
            const temp = [...this.allJobApplies];
            const index = temp.findIndex(apply => apply._id === this.singleApplyData._id);
            temp.splice(index, 1);
            this.setAllJobApplies(temp);
            this.setDeleteFlag()
          };
        })
        .catch(err => console.log(err))
    },
    setIsUserLogged() {
      this.isUserLogged = !this.isUserLogged;
    },
  }
}