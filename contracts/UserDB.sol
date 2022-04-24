// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

contract UserDB {
    struct User {
        uint256 userID;
        string name;
        string lastName;
        int256 dateOfBirth;
        string color;
        string says;
        string topic1;
        string topic2;
        string topic3;
    }
    User[] public users;
    error Max7UsersCanBeSaved();
    event NewUserSaved(uint256 user_id);

    constructor() {
        users.push(
            User(
                0,
                "Ozdemir",
                "Asaf",
                -1466671836000,
                "blue",
                "I will hide you, believe me. In what I write, in what I draw. In what I sing, in what I say.",
                "poems",
                "literature",
                "instabook"
            )
        );
    }

    function saveUser(
        string memory name,
        string memory last_name,
        int256 date_of_birth,
        string memory _color,
        string memory _says,
        string memory topic_1,
        string memory topic_2,
        string memory topic_3
    ) external {
        if (users.length > 7) {
            revert Max7UsersCanBeSaved();
        }
        uint256 user_id = users.length;
        users.push(
            User(
                user_id,
                name,
                last_name,
                date_of_birth,
                _color,
                _says,
                topic_1,
                topic_2,
                topic_3
            )
        );
        emit NewUserSaved(user_id);
    }

    function getAllUsers() external view returns (User[] memory) {
        return users;
    }
}
